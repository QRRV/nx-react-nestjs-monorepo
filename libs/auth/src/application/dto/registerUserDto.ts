import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password!: string;

  @IsString()
  bio!: string;
}
