import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({
    summary: 'Получить список всех колонок пользователя',
    description:
      'Возвращает список всех существующих колонок пользователя по его ID в формате JSON',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонки найдены',
  })
  @Get()
  async findAll(@Param('userId') userId: string) {
    return this.columnService.findAllByUserId(+userId);
  }

  @ApiOperation({
    summary: 'Получить колонку по ID',
    description: 'Возвращает информацию о колонке',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID колонки' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Колонка найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Колонка не найдена',
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.columnService.findById(id);
  }


  @Authorization()
  @ApiOperation({
    summary: 'Создать колонку',
    description: 'Создает колонку и привязывает ее к пользователю',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'ID пользователя владельца',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Tasks' },
        color: {
          type: 'Color',
          enum: ['red', 'green', 'blue', 'none'],
          example: 'red',
        },
      },
    },
  })
  @Post()
  async create(@Authorized('id') userId: string, @Body() dto: CreateColumnDto) {
    return this.columnService.create(+userId, dto);
  }


  @Authorization()
  @ApiOperation({
    summary: 'Удалить колонку',
    description: 'Удаляет колонку с конкретным Id у пользователя владельца',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'ID пользователя владельца',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID колонки' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Колонка не найдена',
  })
  @Delete(':id')
  async delete(@Param('userId') userId: string, @Param('id') id: string) {
    return this.columnService.delete(+userId, +id);
  }
}
