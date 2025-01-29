import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProjectInvitesService } from './project-invites.service';
import { CreateProjectInviteDto } from './dto/create-project-invite.dto';
import { UpdateProjectInviteDto } from './dto/update-project-invite.dto';
import { ProjectInvite } from './entities/project-invite.entity';
import { UsersInviteDto } from './dto/users-invite.dto';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('project-invites')
export class ProjectInvitesController {
  constructor(private readonly projectInvitesService: ProjectInvitesService) {}

  @Post()
  create(@Body() createProjectInviteDto: CreateProjectInviteDto): Promise<ProjectInvite | null> {
    return this.projectInvitesService.create(createProjectInviteDto);
  }

  @Post('create-invite')
  inviteUserToProject(@Body() project: Project): Promise<{url: string} | null> {
    return this.projectInvitesService.inviteUserToProject(project);
  }

  @Post('accept')
  acceptInvite(@Body() acceptInviteProj:{project: Project, invite: string, user: User}): Promise<{accept: boolean; status: string} | null> {
    console.log( acceptInviteProj)
    return this.projectInvitesService.acceptInvite(acceptInviteProj.project, acceptInviteProj.invite, acceptInviteProj.user);
  }

  @Get()
  findAll(): Promise<ProjectInvite[] | []> {
    return this.projectInvitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectInvite | null> {
    return this.projectInvitesService.findOne(id);
  }

  @Get('allbyproject/:id')
  findAllByProject(@Param('id') idProject: string): Promise<UsersInviteDto[] | []> {
    return this.projectInvitesService.findAllByProject(idProject)
  }

  @Put("update")
  update(@Body() updateProjectInviteDto: UpdateProjectInviteDto): Promise<ProjectInvite | null> {
    return this.projectInvitesService.update(updateProjectInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectInvitesService.remove(id);
  }
}
