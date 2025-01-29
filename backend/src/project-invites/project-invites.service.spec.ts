import { Test, TestingModule } from '@nestjs/testing';
import { ProjectInvitesService } from './project-invites.service';

describe('ProjectInvitesService', () => {
  let service: ProjectInvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectInvitesService],
    }).compile();

    service = module.get<ProjectInvitesService>(ProjectInvitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
