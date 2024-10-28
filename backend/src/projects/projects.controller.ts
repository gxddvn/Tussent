import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectCreate } from './dto/projectcreate.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    createProject(@Body() project: Project): Promise<Project | null> {
        return this.projectsService.createProject(project);
    }

    @Get()
    getAllProjects(): Promise<Project[] | null> {
        return this.projectsService.getAllProjects()
    }

    @Get(":id")
    getOneById(@Param('id') id: string): Promise<Project | null> {
        return this.projectsService.getOneById(id);
    }
    
    @Get("allbyid/:id")
    getAllById(@Param('id') id: string, @Query('limit') limit: number = 14): Promise<Project[] | null> {
        return this.projectsService.getAllById(id, limit)
    }

    @Get("recentlybyid/:id")
    getRecentlyById(@Param('id') id: string): Promise<Project[] | null> {
        return this.projectsService.getRecentlyById(id);
    }

    @Put("update")
    updateProject(@Body() project: Project): Promise<Project | null> {
        return this.projectsService.updateProject(project)
    }

    @Delete("delete/:id")
    deleteProject(@Param("id") id: string): Promise<Project | null | void> {
        return this.projectsService.deleteProject(id)
    }
}
