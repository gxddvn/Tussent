import { Module } from '@nestjs/common';
import { NotificationSystemService } from './notification-system.service';
import { NotificationSystemController } from './notification-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationSystem } from './entities/notification-system.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationSystem]),
  ],
  controllers: [NotificationSystemController],
  providers: [NotificationSystemService],
})
export class NotificationSystemModule {}
