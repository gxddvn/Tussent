import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersForReq } from './dto/usersforreq.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserExistsException } from './exceptions/user-exist.exception';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}
    findAll(): Promise<UsersForReq[]> {
        return this.usersRepository.find();
    }
    findOne(id: string): Promise<UsersForReq | null> {
        return this.usersRepository.findOneBy({ id });
    }
    async registration(user: User): Promise<string | User> {
        const {email} = user;
        const findUser = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email})
            .getOne();
        if (!findUser) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            const {password, ...saveUser} = await this.usersRepository.save(user);
            return this.jwtService.sign(saveUser);
        } else throw new UserExistsException();
    }
}
