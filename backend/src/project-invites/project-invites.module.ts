import { Module } from '@nestjs/common';
import { ProjectInvitesService } from './project-invites.service';
import { ProjectInvitesController } from './project-invites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectInvite } from './entities/project-invite.entity';
import { RedisModule } from 'nestjs-redis';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectInvite, User]),
    RedisModule,
  ],
  controllers: [ProjectInvitesController],
  providers: [ProjectInvitesService],
})
export class ProjectInvitesModule {}
