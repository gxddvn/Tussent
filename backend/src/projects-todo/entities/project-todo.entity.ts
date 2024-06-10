import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProjectTodo {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    todo_name: string;
    @Column()
    todo_stage: string;
    @ManyToOne(() => User, (user) => user.project_todo)
    user: User
    @ManyToOne(() => Project, (project) => project.project_todo)
    project: Project
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}