import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectInviteDto } from './create-project-invite.dto';

export class UpdateProjectInviteDto extends PartialType(CreateProjectInviteDto) {}
