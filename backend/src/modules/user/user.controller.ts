import { CreateUserDto } from '@/modules/user/dto/createUser.dto';
import { UpdateUserDto } from '@/modules/user/dto/updateUser.dto';
import { UserService } from '@/modules/user/user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
