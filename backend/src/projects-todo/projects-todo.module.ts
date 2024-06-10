import { Module } from '@nestjs/common';
import { ProjectsTodoController } from './projects-todo.controller';
import { ProjectsTodoService } from './projects-todo.service';

@Module({
  controllers: [ProjectsTodoController],
  providers: [ProjectsTodoService]
})
export class ProjectsTodoModule {}
