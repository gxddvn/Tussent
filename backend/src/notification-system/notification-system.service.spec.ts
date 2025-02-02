import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSystemService } from './notification-system.service';

describe('NotificationSystemService', () => {
  let service: NotificationSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationSystemService],
    }).compile();

    service = module.get<NotificationSystemService>(NotificationSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
