import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectInvite } from 'src/project-invites/entities/project-invite.entity';
import { ProjectTodo } from 'src/projects-todo/entities/project-todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectInvite, ProjectTodo]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
