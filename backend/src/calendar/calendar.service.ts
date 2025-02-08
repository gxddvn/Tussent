import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEventCalendarDto } from './dto/create-event-calendar.dto';

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(Calendar)
        private calendarRepository: Repository<Calendar>
    ) {}

    async createCalendar(calendar: CreateEventCalendarDto): Promise<null | Calendar | string> {
        const calendarInstance = plainToClass(CreateEventCalendarDto, calendar);
        const errors = await validate(calendarInstance);
        if (errors.length > 0) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Validation failed', details: errors },
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            return this.calendarRepository.save(calendar);
        }
        catch (e) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Internal server error', details: e.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCalendar(): Promise<Calendar[]> {
        return this.calendarRepository.find()
    }

    async getOneCalendar(id: string): Promise<Calendar | string | null> {
        return this.calendarRepository.findOneBy({id})
    }
    
    async getEventCalendarByUserId(id: string): Promise<Calendar[] | string | null> {
        console.log("rend")
        return this.calendarRepository.findBy({user: {id}})
    }

    async getAllCalendarById(id: string): Promise<Calendar[] | null> {
        return this.calendarRepository.find({where: {user: {id}}})
    }

    async udpateCalendarById(calendar: Calendar): Promise<Calendar | null> {
        return this.calendarRepository.save(calendar)
    }

    async deleteCalendar(id: string): Promise<void> {
        await this.calendarRepository.delete(id)
    }
}
