import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Почтовый адрес',
    example: 'example@lordfilm.com',
  })
  @IsString({ message: 'Почта должно быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательно для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат почты' })
  email: string;

  @ApiProperty({
    description: 'Пароль от аккаунта',
    example: 'qwerty',
    minLength: 6,
    maxLength: 29,
  })
  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязательно для заполнения' })
  @MinLength(6, { message: 'Пароль не может быть меньше 6 символов' })
  @MaxLength(29, { message: 'Пароль не может быть больше 29 символов' })
  password: string;
}
