import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsTodoService } from './projects-todo.service';
import { ProjectTodo } from './entities/project-todo.entity';

@Controller('projects-todo')
export class ProjectsTodoController {
    constructor(private readonly projectsTodoService: ProjectsTodoService) {}

    @Post()
    createProjectsTodo(@Body() project_todo: ProjectTodo) {
        return this.projectsTodoService.createProjectTodo(project_todo);
    }

    @Get()
    getAllProjectTodo(): Promise<ProjectTodo[] | null> {
        return this.projectsTodoService.getAllProjectTodo()
    }

    @Get(':id')
    getOneProjectTodo(@Param('id') id: string): Promise<ProjectTodo | null> {
        return this.projectsTodoService.getOneProjectTodo(id);
    }

    @Get('allbyid/:id')
    getAllByIdProjectTodo(@Param('id') id: string): Promise<ProjectTodo[] | null> {
        return this.projectsTodoService.getAllByIdProjectTodo(id)
    }

    @Put('update')
    updateProjectTodo(@Body() project_todo: ProjectTodo): Promise<ProjectTodo | null> {
        return this.projectsTodoService.updateProjectTodo(project_todo)
    }

    @Delete('delete/:id')
    deleteProjectTodo(@Param('id') id: string): Promise<ProjectTodo | null | void> {
        return this.projectsTodoService.deleteProjectTodo(id)
    }
}
