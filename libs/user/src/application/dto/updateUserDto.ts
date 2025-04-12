import { IsOptional, IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio?: string;
}
