import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Почта обязательно должна быть заполнена' })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsEmail({}, { message: 'Некорректный формат почты' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Пароль обязательно должен быть заполнен' })
  @IsString({ message: 'Пароль должен быть строкой ' })
  @Length(8, 24, { message: 'Пароль должен содержать от 8 до 24 символов' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Имя обязательно должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой ' })
  name: string;
}
