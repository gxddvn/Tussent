import { Calendar } from "src/calendar/entities/calendar.entity";
import { ProjectTodo } from "src/projects-todo/entities/project-todo.entity";
import { Project } from "src/projects/entities/project.entity";
import { Workspace } from "src/workspaces/entities/workspace.entity";

export class UsersForReq {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    workspace: Workspace[]
    project: Project[]
    project_todo: ProjectTodo[]
    calendar: Calendar[]
}