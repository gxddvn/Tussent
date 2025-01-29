import { Test, TestingModule } from '@nestjs/testing';
import { ProjectInvitesController } from './project-invites.controller';
import { ProjectInvitesService } from './project-invites.service';

describe('ProjectInvitesController', () => {
  let controller: ProjectInvitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectInvitesController],
      providers: [ProjectInvitesService],
    }).compile();

    controller = module.get<ProjectInvitesController>(ProjectInvitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
