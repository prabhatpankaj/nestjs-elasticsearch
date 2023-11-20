import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ParamDto, UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/create-user")
    createUser(
        @Body() userDto: UserDto
    ) {
        try {
            return this.userService.createUser(userDto)
        } catch (error){
            throw error
        }

    }

    @Get("/get-user-posts")
    getUserPosts(
        @Query() paramDto: ParamDto
    ) {
        try {
            return this.userService.getUserPosts(+paramDto.id)
        } catch (error){
            throw error
        }

    }
}
