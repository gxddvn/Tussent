import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProjectInviteDto } from './dto/create-project-invite.dto';
import { UpdateProjectInviteDto } from './dto/update-project-invite.dto';
import { plainToClass } from 'class-transformer';
import { ProjectInvite } from './entities/project-invite.entity';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UsersInviteDto } from './dto/users-invite.dto';
import { Project } from 'src/projects/entities/project.entity';
import Redis from 'ioredis';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectInvitesService {

  constructor(
    @InjectRepository(ProjectInvite)
    private projectsInvitesRepository: Repository<ProjectInvite>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('REDIS_SERVICE') private readonly client: Redis,
    private dataSource: DataSource,
  ) {}

  async create(projectInvite: CreateProjectInviteDto) {
    const projectInvitesInstance = plainToClass(ProjectInvite, projectInvite)
    const errors = await validate(projectInvitesInstance);
    if (errors.length > 0) {
      throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
          HttpStatus.BAD_REQUEST
      );
    }
    try {
      return await this.projectsInvitesRepository.save(projectInvite);
    }
    catch (e) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  generateCode(): string {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    return code;
}

  async inviteUserToProject(project: Project) {
    const projectInstance = plainToClass(Project, project);
    const errors = await validate(projectInstance);
    if (errors.length > 0) {
        console.error(`Error creating project: Validation failed`, errors);
        throw new HttpException(
            { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
            HttpStatus.BAD_REQUEST
        );
    }
    try {
      const inviteCode = this.generateCode()
      await this.client.set(`project-${project.id}`, inviteCode, 'EX', 86400);
      return {url: `http://localhost:5173/project-invite?project=${project.id}&invite=${inviteCode}`}
    } catch (e) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptInvite(project: Project, invite: string, user: User) {
    if (!project) {
      console.error("Project is undefined");
      throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Project is undefined' },
          HttpStatus.BAD_REQUEST
      );
    }

    if (!user) {
      console.error("User is undefined");
      throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'User is undefined' },
          HttpStatus.BAD_REQUEST
      );
    }
    const userNew = await this.usersRepository.findOne({where: {id: user.id}});
    const projectInstance = plainToClass(Project, project);
    const userInstance = plainToClass(User, userNew);

    const [errorsProj, errorsUser] = await Promise.all([validate(projectInstance), validate(userInstance)]);
    if (errorsProj.length > 0 || errorsUser.length > 0) {
      const errors = [...errorsProj, ...errorsUser];
      console.error(`Error: Validation failed`, errors);
      throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
          HttpStatus.BAD_REQUEST
      );
    }

    try {
      const inviteCode = await this.client.get(`project-${project.id}`);
      if (invite === inviteCode) {
        const res:CreateProjectInviteDto = {project, user: userNew}
        await this.projectsInvitesRepository.save(res);
        return { accept: true, status: 'Invite accepted' };
      } else {
        return { accept: false, status: 'Wrong invite code' };
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      throw new HttpException(
          { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message },
          HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
}

  findAll() {
    return this.projectsInvitesRepository.find();
  }

  findOne(id: string) {
    return this.projectsInvitesRepository.findOneBy({id});
  }

  async findAllByProject(idProject: string): Promise<UsersInviteDto[] | []> {
    const projectInvites = await this.projectsInvitesRepository.find({where: {project: {id: idProject}}, relations: ['user', 'project']})
    let usersInv: UsersInviteDto[] = []
    projectInvites.forEach((proj) => {
      const {email, password, createdAt, updatedAt, ...user} = proj.user
      usersInv = [...usersInv, user]
    })

    console.log(usersInv)
    return usersInv
  }

  update(projectInvite: UpdateProjectInviteDto) {
    return this.projectsInvitesRepository.save(projectInvite);
  }

  async remove(id: string) {
    await this.projectsInvitesRepository.delete(id);
  }
}
