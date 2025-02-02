import { User } from "src/users/entities/user.entity";

export class CreateNotificationSystemDto {
    message: string;
    user: User;
}
