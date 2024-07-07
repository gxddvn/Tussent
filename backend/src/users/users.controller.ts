import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersForReq } from './dto/usersforreq.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    // @UseGuards(JwtAuthGuard)
    getAll(): Promise<UsersForReq[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: string): Promise<UsersForReq> {
        return this.userService.findOne(id);
    }

    // @Post()
    // registration(@Body() user: User): Promise<string | User> {
    //     return this.userService.registration(user);
    // }

    // @Post('login')
    // login(@Body() user: AuthPayloadDto): Promise<string | User> {
    //     return this.userService.login(user);
    // }

    // @Post('auth')
    // // @UseGuards(JwtAuthGuard)
    // checkAuth(@Req() req: Request) {
    //     return this.userService.checkAuth(req.user);
    // }

    // @Put(':id')
    // // @UseGuards(JwtAuthGuard)
    // update(@Param('id') id: string, @Body() user: User): Promise<string | User> {
    //     return this.userService.updateUser(user);
    // }

    // @Delete(':id')
    // // @UseGuards(JwtAuthGuard)
    // delete(@Param('id') id: string): Promise<void> {
    //     return this.userService.remove(id);
    // }
}
