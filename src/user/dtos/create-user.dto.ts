import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @Matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
  name: string;

  @IsEmail()
  email: string;
}
