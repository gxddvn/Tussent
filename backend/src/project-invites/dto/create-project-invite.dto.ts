import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class CreateProjectInviteDto {
    user: User;
    project: Project
}
