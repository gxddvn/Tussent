import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsTodoController } from './projects-todo.controller';

describe('ProjectsTodoController', () => {
  let controller: ProjectsTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsTodoController],
    }).compile();

    controller = module.get<ProjectsTodoController>(ProjectsTodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
