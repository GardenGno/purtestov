import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить список всех пользователей',
    description:
      'Возвращает список всех существующих пользователей в формате JSON',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователи найдены',
  })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Получить пользователя по ID',
    description: 'Возвращает информацию о пользователе',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID Пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'example@gmail.com' },
        password: { type: 'string', example: 'qwerty123456' },
        name: { type: 'string', example: 'Jhon Doe' },
      },
    },
  })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Удаляет пользователя по ID',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID Пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
