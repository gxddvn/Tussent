import { IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProjectTodo {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    todo_name: string;
    @Column()
    @IsNotEmpty()
    todo_stage: string;
    @ManyToOne(() => User, (user) => user.project_todo)
    @IsNotEmpty()
    user: User
    @ManyToOne(() => Project, (project) => project.project_todo)
    @IsNotEmpty()
    project: Project
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}