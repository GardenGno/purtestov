import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CardService } from 'src/card/card.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly cardService: CardService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dto: CreateCommentDto): Promise<boolean> {
    const { text, cardId } = dto;
    const card = await this.cardService.findById(cardId);
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    const user = await this.userService.findById(userId);

    const comment = this.commentRepository.create({
      text,
      card,
      user,
    });

    this.commentRepository.save(comment);
    return true;
  }

  async findById(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    return comment;
  }

  async findByCard(cardId: number): Promise<CommentEntity[]> {
    const card = await this.cardService.findById(cardId);
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    const comments = this.commentRepository.find({
      where: { card: { id: cardId } },
      relations: ['user'],
    });
    if ((await comments).length === 0) {
      throw new NotFoundException('Комментарии не найдены');
    }
    return comments;
  }

  async delete(id: number): Promise<boolean> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    this.commentRepository.remove(comment);
    return true;
  }
}
