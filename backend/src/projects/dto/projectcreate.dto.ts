import { User } from "src/users/entities/user.entity";
import { Workspace } from "src/workspaces/entities/workspace.entity";

export class ProjectCreate {
    name: string;
    user: User;
    workspace: Workspace;
}