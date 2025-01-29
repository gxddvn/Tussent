import { IsNotEmpty } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProjectInvite {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(() => User, (user) => user.project)
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