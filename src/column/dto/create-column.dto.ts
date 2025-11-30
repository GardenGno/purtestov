import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Color } from '../entities/column.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Название колонки обязательно должно быть заполнено' })
  @IsString({ message: 'Название колонки должно быть строкой' })
  @MaxLength(30, {
    message: 'Название колонки не должно быть больше 30 символов',
  })
  title: string;

  @ApiProperty()
  @IsEnum(Color, { message: 'Недопустимое значение цвета' })
  @IsOptional()
  color: Color;
}
