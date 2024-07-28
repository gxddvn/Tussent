import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './entities/workspace.entity';

@Controller('workspaces')
export class WorkspacesController {
    constructor(private readonly workspacesService: WorkspacesService) {}

    @Post()
    createProject(@Body() workspace: Workspace) {
        return this.workspacesService.createWorkspace(workspace);
    }

    @Get()
    getAllWorkspaces(): Promise<Workspace[] | null> {
        return this.workspacesService.getAllWorkspaces()
    }

    @Get(':id')
    getOneWorkspaceById(@Param('id') id: string): Promise<Workspace | null> {
        return this.workspacesService.getOneWorkspaceById(id)
    }

    @Get('allbyid/:id')
    getAllWorkspacesById(@Param('id') id: string): Promise<Workspace[] | null> {
        return this.workspacesService.getAllWorkspacesById(id)
    }

    @Put("update")
    updateWorkspace(workspace: Workspace): Promise<Workspace | null> {
        return this.workspacesService.updateWorkspace(workspace)
    }

    @Delete("delete")
    deleteWorkspace(id: string): Promise<Workspace | null | void> {
        return this.workspacesService.deleteWorkspace(id)
    }
}
