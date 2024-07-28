import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTodo } from './entities/project-todo.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ProjectsTodoService {
    constructor(
        @InjectRepository(ProjectTodo)
        private projectTodoRepository: Repository<ProjectTodo>,
    ) {}

    async createProjectTodo(project_todo: ProjectTodo): Promise<ProjectTodo> {
        const projectTodoInstance = plainToClass(ProjectTodo, project_todo)
        const errors = await validate(projectTodoInstance);
        if (errors.length > 0) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            return await this.projectTodoRepository.save(project_todo);
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return this.projectTodoRepository.save(project_todo)
    }

    async getAllProjectTodo(): Promise<ProjectTodo[] | null> {
        return this.projectTodoRepository.find();
    }

    async getOneProjectTodo(id: string): Promise<ProjectTodo | null> {
        return this.projectTodoRepository.findOneBy({id})
    }

    async getAllByIdProjectTodo(id: string): Promise<ProjectTodo[] | null> {
        return this.projectTodoRepository.find({where: {user: {id}}})
    }

    async updateProjectTodo(project_todo: ProjectTodo): Promise<ProjectTodo | null> {
        return this.projectTodoRepository.save(project_todo)
    }

    async deleteProjectTodo(id: string): Promise<void> {
        let project_todo = await this.projectTodoRepository.findOneBy({id})
        await this.projectTodoRepository.delete(project_todo)
    }
}
