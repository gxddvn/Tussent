import { Injectable } from '@nestjs/common';
import { CreateNotificationSystemDto } from './dto/create-notification-system.dto';
import { UpdateNotificationSystemDto } from './dto/update-notification-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationSystem } from './entities/notification-system.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class NotificationSystemService {
  constructor(
    @InjectRepository(NotificationSystem)
    private notificationSystemRepository: Repository<NotificationSystem>,
  ) {}

  async create(createNotificationSystemDto: CreateNotificationSystemDto) {
    try {
      await validateOrReject(createNotificationSystemDto);
      const notificationSystem = this.notificationSystemRepository.create(createNotificationSystemDto);
      return await this.notificationSystemRepository.save(notificationSystem);
    } catch (error) {
      throw new Error(`Validation failed: ${error}`);
    }
  }
  
  async findAll() {
    try {
      return await this.notificationSystemRepository.find();
    } catch (error) {
      throw new Error(`Failed to retrieve notification systems: ${error}`);
    }
  }
  
  async findOne(id: string) {
    try {
      return await this.notificationSystemRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to retrieve notification system with id ${id}: ${error}`);
    }
  }
  
  async update(id: string, updateNotificationSystemDto: UpdateNotificationSystemDto) {
    try {
      await validateOrReject(updateNotificationSystemDto);
      await this.notificationSystemRepository.update(id, updateNotificationSystemDto);
      return await this.notificationSystemRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to update notification system with id ${id}: ${error}`);
    }
  }
  
  async remove(id: string) {
    try {
      const result = await this.notificationSystemRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Notification system with id ${id} not found`);
      }
      return `Notification system with id ${id} has been removed`;
    } catch (error) {
      throw new Error(`Failed to remove notification system with id ${id}: ${error}`);
    }
  }
}
