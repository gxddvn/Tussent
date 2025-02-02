import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export type NotifyStatusType = "unread" | "read";

@Entity()
export class NotificationSystem {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    message: string;
    @Column({type: "enum", enum: ["unread", "read"], default: "unread"})
    @IsNotEmpty()
    status: NotifyStatusType;
    @ManyToOne(() => User, (user) => user.calendar)
    @IsNotEmpty()
    user: User
}
