import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'Создать комментарий',
    description:
      'Создает комментарий и привязывает его к карточке, также назначает владельца',
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
        text: { type: 'string', example: 'Comment 1' },
        cardId: { type: 'number', example: '1' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Authorization()
  @Post()
  async create(
    @Body() dto: CreateCommentDto,
    @Authorized('id') userId: string,
  ) {
    return this.commentService.create(+userId, dto);
  }

  @ApiOperation({
    summary: 'Получить комментарий по ID',
    description: 'Возвращает информацию о комментарии',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID комментария' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Комментарий найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Коментарий не найден',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.commentService.findById(+id);
  }

  @ApiOperation({
    summary: 'Получить список всех комментариев в карточке',
    description:
      'Возвращает список всех существующих комментариев в карточке по ее ID в формате JSON',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Комментарии найдены',
  })
  @Get('/byCard/:cardId')
  async findByCard(@Param('cardId') cardId: string) {
    return this.commentService.findByCard(+cardId);
  }

  @ApiOperation({
    summary: 'Удалить комментарий',
    description: 'Удаляет комментарий с конкретным Id в карточке',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID комментария',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'комментарий не найден',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(+id);
  }
}
