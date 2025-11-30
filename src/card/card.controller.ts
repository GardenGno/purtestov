import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { CreateCardDto } from './dto/create-card.dto';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({
    summary: 'Создать карточку',
    description:
      'Создает карточку и привязывает ее к колонке и назначает владельца',
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
        title: { type: 'string', example: 'Task 1' },
        description: { type: 'string', example: 'Description for task 1' },
        isDone: { type: 'boolean', example: 'true' },
        columnId: { type: 'number', example: '1' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Authorization()
  @Post()
  async create(@Body() dto: CreateCardDto, @Authorized('id') userId: string) {
    return this.cardService.create(+userId, dto);
  }

  @ApiOperation({
    summary: 'Получить карточку по ID',
    description: 'Возвращает информацию о карточке',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID карточки' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Карточка найдена' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cardService.findById(+id);
  }

  @ApiOperation({
    summary: 'Получить список всех карточек в колонке',
    description:
      'Возвращает список всех существующих карточек в колонке по ее ID в формате JSON',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонки найдены',
  })
  @Get('byColumn/:columnId')
  async findAllByColumnId(@Param('columnId') columnId: string) {
    return this.cardService.findAllByColumnId(+columnId);
  }

  @ApiOperation({
    summary: 'Удалить карточку',
    description: 'Удаляет карточку с конкретным Id в колонке',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID карточки',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  @Authorization()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardService.delete(+id);
  }
}
