import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    description: 'Отображаемое имя',
    example: 'Пшек Пшекович',
    maxLength: 50,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  name: string;

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
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @MinLength(6, { message: 'Пароль не может быть меньше 6 символов' })
  @MaxLength(29, { message: 'Пароль не может быть больше 29 символов' })
  password: string;
}
