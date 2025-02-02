import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Calendar {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    name: string;
    @CreateDateColumn({ type: 'timestamptz' })
    @IsNotEmpty()
    date: Date;
    @ManyToOne(() => User, (user) => user.calendar)
    @IsNotEmpty()
    user: User
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}