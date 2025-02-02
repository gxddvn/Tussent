import { User } from "src/users/entities/user.entity";

export class CreateEventCalendarDto {
    name: string;
    date: string;
    user: User;
}