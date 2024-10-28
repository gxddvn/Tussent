import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
    providers: [
        {
        provide: 'REDIS_SERVICE',
        useFactory: () => {
            return new Redis({
            host: 'localhost', 
            port: 6379,        
            });
        },
        },
    ],
    exports: ['REDIS_SERVICE'],
})
export class RedisModule {}