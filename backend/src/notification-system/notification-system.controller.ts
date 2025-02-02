import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationSystemService } from './notification-system.service';
import { CreateNotificationSystemDto } from './dto/create-notification-system.dto';
import { UpdateNotificationSystemDto } from './dto/update-notification-system.dto';

@Controller('notification-system')
export class NotificationSystemController {
  constructor(private readonly notificationSystemService: NotificationSystemService) {}

  @Post()
  create(@Body() createNotificationSystemDto: CreateNotificationSystemDto) {
    return this.notificationSystemService.create(createNotificationSystemDto);
  }

  @Get()
  findAll() {
    return this.notificationSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationSystemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationSystemDto: UpdateNotificationSystemDto) {
    return this.notificationSystemService.update(id, updateNotificationSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationSystemService.remove(id);
  }
}
