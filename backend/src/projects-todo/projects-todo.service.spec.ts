import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsTodoService } from './projects-todo.service';

describe('ProjectsTodoService', () => {
  let service: ProjectsTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsTodoService],
    }).compile();

    service = module.get<ProjectsTodoService>(ProjectsTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
