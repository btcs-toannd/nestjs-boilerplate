import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dtos/index.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update({
      where: { id: Number(id) },
      data: { ...updateUserData },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UserModel> {
    return this.userService.delete({ id: Number(id) });
  }
}
