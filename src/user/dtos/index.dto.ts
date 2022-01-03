import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

class UpdateUserDto extends OmitType(CreateUserDto, [] as const) {}

export { CreateUserDto, UpdateUserDto };
