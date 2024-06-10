import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { WorkspacesService } from './workspaces/workspaces.service';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ProjectsModule } from './projects/projects.module';
import { Workspace } from './workspaces/entities/workspace.entity';
import { Project } from './projects/entities/project.entity';
import { ProjectsTodoModule } from './projects-todo/projects-todo.module';
import { ProjectTodo } from './projects-todo/entities/project-todo.entity';
import { CalendarModule } from './calendar/calendar.module';
import { Calendar } from './calendar/entities/calendar.entity';

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
        entities: [User, Workspace, Project, ProjectTodo, Calendar],
        synchronize: true,
      })
    }), 
    UsersModule, WorkspacesModule, ProjectsModule, ProjectsTodoModule, CalendarModule
  ],
  controllers: [UsersController, WorkspacesController],
  providers: [UsersService, WorkspacesService],
})
export class AppModule {}
