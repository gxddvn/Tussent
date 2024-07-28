import { IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(() => User, (user) => user.workspace)
    @IsNotEmpty()
    user: User
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => Project, (project) => project.workspace)
    project: Project[]
}