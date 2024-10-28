import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectCreate } from './dto/projectcreate.dto';
import { User } from 'src/users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) {}

    async createProject(project: Project): Promise<Project | null>{
        const projectInstance = plainToClass(Project, project)
        const errors = await validate(projectInstance);
        if (errors.length > 0) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            return await this.projectsRepository.save(project);
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectsRepository.find()
    }

    async getOneById(id: string): Promise<Project | null> {
        return this.projectsRepository.findOneBy({id})
    }

    async getAllById(id: string, limit: number): Promise<Project[] | null> {
        console.log(id, limit)
        const data = await this.projectsRepository.find({
            where: {workspace: {id}}, 
            take: limit,
        })
        console.log(data)
        return data
    }

    async getRecentlyById(id:string): Promise<Project[] | null> {
        return this.projectsRepository.find({
            where: {workspace: {id}},
            order: {
                updatedAt: 'DESC',
            },
            take: 5,
        })
    }

    async updateProject(project: Project): Promise<Project | null> {
        return this.projectsRepository.save(project)
    }

    async deleteProject(id: string): Promise<void> {
        await this.projectsRepository.delete(id)
    }
}
