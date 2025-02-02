import { IsNotEmpty } from 'class-validator';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { NotificationSystem } from 'src/notification-system/entities/notification-system.entity';
import { ProjectInvite } from 'src/project-invites/entities/project-invite.entity';
import { ProjectTodo } from 'src/projects-todo/entities/project-todo.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    email: string;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column()
    @IsNotEmpty()
    password: string;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
    
    @OneToMany(() => Workspace, (workspace) => workspace.user)
    workspace: Workspace[]
    @OneToMany(() => Project, (project) => project.user)
    project: Project[]
    @OneToMany(() => ProjectTodo, (project_todo) => project_todo.user)
    project_todo: ProjectTodo[]
    @OneToMany(() => Calendar, (calendar) => calendar.user)
    calendar: Calendar[]
    @OneToMany(() => ProjectInvite, (project_invite) => project_invite.user)
    project_invite: ProjectInvite[]
    @OneToMany(() => NotificationSystem, (notifycations) => notifycations.user)
    notifycations: NotificationSystem[]
}