import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Название карточки обязательно должно быть заполнено',
  })
  @IsString({ message: 'Название карточки должно быть строкой' })
  @MaxLength(30, {
    message: 'Название колонки не должно быть больше 30 символов',
  })
  title: string;

  @ApiProperty({required:false})
  @IsString({ message: 'Название карточки должно быть строкой' })
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDone: boolean;

  @ApiProperty()
  @IsInt()
  columnId: number;
}
