import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationSystemDto } from './create-notification-system.dto';

export class UpdateNotificationSystemDto extends PartialType(CreateNotificationSystemDto) {}
