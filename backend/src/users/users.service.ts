import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersForReq } from './dto/usersforreq.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserExistsException } from './exceptions/user-exist.exception';
import { EmailVerifDto, UserForReg } from './dto/userforreg.dto';
import { UserForAuth } from './dto/userforauth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Redis } from 'ioredis';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { use } from 'passport';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Workspace)
        private workspaceRepository: Repository<Workspace>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
        @Inject('REDIS_SERVICE') private readonly client: Redis
    ) {}
    findAll(): Promise<UsersForReq[]> {
        return this.usersRepository.find();
    }
    findOne(id: string): Promise<UsersForReq | null> {
        return this.usersRepository.findOneBy({ id });
    }
    async registration(user: UserForReg): Promise<string | User> {
        const {email} = user;
        const findUser = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email})
            .getOne();
        if (!findUser) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            const {password, ...saveUser} = await this.usersRepository.save(user);
            const {id, ...workspace} = await this.workspaceRepository.save({user: {id: saveUser.id}});
            return this.jwtService.sign({...saveUser, workspaceId: id});
        } else throw new UserExistsException();
    }

    async sendCustomEmail(email: string, htmlContent: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Tussent: Email verification',
            html: htmlContent,
        });
    }

    generateCode(): string {
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        return code;
    }

    async email_verif({email, emailHtml}: EmailVerifDto): Promise<string> {
        const emailInstance = plainToClass(EmailVerifDto, {email, emailHtml})
        const errors = await validate(emailInstance);
        if (errors.length > 0) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            const verificationCode = this.generateCode();
            const updatedHtml = emailHtml.replace('CODE_VERIFICATION', verificationCode);
            await this.client.set(email, verificationCode, 'EX', 300)
            this.sendCustomEmail(email, updatedHtml);
            return "Email Successfully Sent!";
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkEmailVerif(email: string, code: string): Promise<boolean> {
        try {
            const data = await this.client.get(email);
            console.log(data)
            return (data == code) ? true : false
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login({email, password}: UserForAuth): Promise<string | User> {
        const findUser = await this.usersRepository.findOneBy({ email })
        if (!findUser) return null;
        const isMatch = await bcrypt.compare(password, findUser?.password);
        if (isMatch) {
            const {password, ...user} = findUser;
            const workspaceUser = await this.workspaceRepository.findOneBy({user:{id: user.id}})
            const {id, ...workspaceA} = workspaceUser;
            // console.log(workspaceUser)
            let token = this.jwtService.sign({...user, workspaceId: id})
            return token
        }
        return findUser;
    }
    
    async checkAuth(user: any) {
        const {iat, exp, ...userA} = user;
        const workspaceUser = await this.workspaceRepository.findOneBy({user:{id: userA.id}})
        const {id, ...workspaceA} = workspaceUser;
        const userB = {...userA, workspaceId: id}
        return this.jwtService.sign(userB)
    }

    async updateUser(user: User): Promise<string | User> {
        const {password, ...saveUser} = await this.usersRepository.save(user)
        return this.jwtService.sign(saveUser);
    }
    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
