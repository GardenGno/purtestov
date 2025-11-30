import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ColumnService } from 'src/column/column.service';
import { CreateCardDto } from './dto/create-card.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly columnService: ColumnService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dto: CreateCardDto): Promise<boolean> {
    const { title, description, isDone, columnId } = dto;
    const column = await this.columnService.findById(columnId);
    if (column.userId !== userId) {
      throw new ConflictException('Нельзя добавить карточку к этой колонке');
    }
    if (!column) {
      throw new NotFoundException('Указанной колонки не существует');
    }
    const user = await this.userService.findById(userId);
    const card = this.cardRepository.create({
      title,
      description,
      isDone,
      column,
      user,
    });
    this.cardRepository.save(card);
    return true;
  }

  async findById(id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['column', 'user'],
    });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    return card;
  }

  async findAllByColumnId(columnId: number): Promise<CardEntity[]> {
    const column = await this.columnService.findById(columnId);
    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
    return this.cardRepository.find({ where: { columnId } });
  }

  async delete(id: number): Promise<boolean>{
    const card = await this.findById(id);
    if(!card){
        throw new NotFoundException('Карточка не найдена')
    }
    this.cardRepository.remove(card);
    return true;
  }
}
