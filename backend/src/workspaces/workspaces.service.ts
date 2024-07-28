import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspace)
        private workspacesRepository: Repository<Workspace>,
    ) {}

    async createWorkspace(workspace: Workspace): Promise<Workspace | null> {
        const workspaceInstance = plainToClass(Workspace, workspace)
        const errors = await validate(workspaceInstance);
        if (errors.length > 0) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            return await this.workspacesRepository.save(workspace);
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async getAllWorkspaces(): Promise<Workspace[] | null> {
        return this.workspacesRepository.find()
    }
    
    async getOneWorkspaceById(id: string): Promise<Workspace | null> {
        return this.workspacesRepository.findOneBy({id})
    }

    async getAllWorkspacesById(id: string): Promise<Workspace[] | null> {
        return this.workspacesRepository.find({where: {user: {id}}})
    }

    async updateWorkspace(workspace: Workspace): Promise<Workspace | null> {
        return this.workspacesRepository.save(workspace)
    }

    async deleteWorkspace(id: string): Promise<Workspace | null | void> {
        let workspace = await this.workspacesRepository.findOneBy({id})
        await this.workspacesRepository.delete(workspace)
    }

}
