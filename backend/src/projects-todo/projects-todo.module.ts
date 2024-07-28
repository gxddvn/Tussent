import { Module } from '@nestjs/common';
import { ProjectsTodoController } from './projects-todo.controller';
import { ProjectsTodoService } from './projects-todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTodo } from './entities/project-todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectTodo])
  ],
  controllers: [ProjectsTodoController],
  providers: [ProjectsTodoService]
})
export class ProjectsTodoModule {}
