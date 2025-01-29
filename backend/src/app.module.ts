import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ProjectsModule } from './projects/projects.module';
import { Workspace } from './workspaces/entities/workspace.entity';
import { Project } from './projects/entities/project.entity';
import { ProjectsTodoModule } from './projects-todo/projects-todo.module';
import { ProjectTodo } from './projects-todo/entities/project-todo.entity';
import { CalendarModule } from './calendar/calendar.module';
import { Calendar } from './calendar/entities/calendar.entity';
import { ProjectInvitesModule } from './project-invites/project-invites.module';
import { ProjectInvite } from './project-invites/entities/project-invite.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Workspace, Project, ProjectTodo, Calendar, ProjectInvite],
        synchronize: true,
      })
    }), 
    UsersModule, WorkspacesModule, ProjectsModule, ProjectsTodoModule, CalendarModule, ProjectInvitesModule
  ],
})
export class AppModule {}
