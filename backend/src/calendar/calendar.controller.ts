import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Calendar } from './entities/calendar.entity';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarServise: CalendarService) {}

    @Post()
    createCalendar(@Body() calendar: Calendar): Promise<Calendar | null | string> {
        return this.calendarServise.createCalendar(calendar);
    }

    @Get()
    getAllCalendar(): Promise<Calendar[] | null> {
        return this.calendarServise.getAllCalendar();
    }

    @Get(":id")
    getOneCalendar(@Param('id') id: string): Promise<Calendar | null | string> {
        return this.calendarServise.getOneCalendar(id);
    }

    @Get("allbyid/:id")
    getAllCalendarById(@Param('id') id: string): Promise<Calendar[] | null> {
        return this.calendarServise.getAllCalendarById(id);
    }

    @Put('update')
    udpateCalendarById(@Body() calendar: Calendar): Promise<Calendar | null> {
        return this.calendarServise.udpateCalendarById(calendar)
    }

    @Delete(':id')
    deleteCalendar(@Param() id: string): Promise<void> {
        return this.calendarServise.deleteCalendar(id)
    }
}
