import { IsNotEmpty } from 'class-validator';
import { ProjectInvite } from 'src/project-invites/entities/project-invite.entity';
import { ProjectTodo } from 'src/projects-todo/entities/project-todo.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column({default:"false"})
    favorite: boolean;
    @ManyToOne(() => User, (user) => user.project)
    @IsNotEmpty()
    user: User
    @ManyToOne(() => Workspace, (workspace) => workspace.project)
    @IsNotEmpty()
    workspace: Workspace
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => ProjectTodo, (project_todo) => project_todo.project)
    project_todo: ProjectTodo[]

    @OneToMany(() => ProjectInvite, (project_invite) => project_invite.project)
    project_invite: ProjectInvite[]
}