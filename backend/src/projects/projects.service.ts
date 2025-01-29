import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import { ProjectCreate } from './dto/projectcreate.dto';
import { User } from 'src/users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ProjectInvite } from 'src/project-invites/entities/project-invite.entity';
import { ProjectTodo } from 'src/projects-todo/entities/project-todo.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        private dataSource: DataSource,
    ) {}

    async createProject(project: Project): Promise<Project | null>{
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
            console.log(`Searching for project with name: ${project.name}`);
            const findProject = await this.projectsRepository.findOne({ where: { name: project.name } });
            console.log(`Found project:`, findProject);
            if (findProject) {
                console.error(`Error creating project: Project with this name already exists`);
                throw new HttpException(
                    { status: HttpStatus.BAD_REQUEST, error: 'Project with this name already exists' },
                    HttpStatus.BAD_REQUEST
                );
            }
            console.log(`Creating project: ${project}`);
            return await this.projectsRepository.save(project);
        } catch (e) {
            console.error(`Error creating project: ${e.message}`);
            if (e instanceof HttpException) {
                throw e; // Re-throw the HttpException to be handled by the global exception filter
            }
            throw new HttpException(
                { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectsRepository.find()
    }

    async getOneById(id: string): Promise<Project | null> {
        return this.projectsRepository.findOne({
            where: {id}, 
            relations: ['user', 'workspace'], 
            select: {user: {id: true, name: true}}
        })
    }

    async getAllById(id: string, limit: number): Promise<Project[] | null> {
        // console.log(id, limit)
        const data = await this.projectsRepository.find({
            where: {workspace: {id}}, 
            take: limit,
        })
        // console.log(data)
        return data
    }

    async getRecentlyById(id:string): Promise<Project[] | null> {
        return this.projectsRepository
            .createQueryBuilder('project')
            .where('project.workspaceId = :id', { id })
            .andWhere('project.updatedAt != project.createdAt')
            .orderBy('project.updatedAt', 'DESC')
            .limit(5)
            .getMany();
    }

    async getFavoriteById(id:string): Promise<Project[] | null> {
        return await this.projectsRepository.find({
            where: {workspace: {id}, favorite: true},
            take: 5,
        })
    }

    async updateProject(project: Project): Promise<Project | null> {
        console.log(project)
        return this.projectsRepository.save(project)
    }

    async deleteProject(id: string): Promise<void> {
        try {
            await this.dataSource.transaction(async (manager) => {
                await manager.getRepository(ProjectInvite).delete({ project: { id } });
                await manager.getRepository(ProjectTodo).delete({ project: { id } });
                await manager.getRepository(Project).delete(id);
            });
        } catch (error) {
            console.error(`Failed to delete project with id ${id}:`, error);
            throw new Error('Failed to delete project');
        }
    }
}
