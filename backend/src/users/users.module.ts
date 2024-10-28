import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisModule } from './redis.module';
import { Workspace } from 'src/workspaces/entities/workspace.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Workspace]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_KEY'),
                signOptions: {expiresIn: "24h"},
            })
        }),
        RedisModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: configService.get<string>('MAIL_TRANSPORT'),
                defaults: {
                    from: `"${configService.get<string>('MAIL_FROM_NAME')}" <${configService.get<string>('MAIL_TRANSPORT').split(':')[1].split('//')[1]}>`,
                },
            }),
        }),
    ],
    providers: [UsersService, JwtStrategy],
    controllers: [UsersController]
})
export class UsersModule {}
