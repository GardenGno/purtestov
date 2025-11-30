import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ColumnEntity } from './entities/column.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColumnDto } from './dto/create-column.dto';


@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    private readonly userService: UserService,
  ) {}

  async findAllByUserId(userId: number): Promise<ColumnEntity[]> {
    const user = await this.userService.findById(userId);
    const columns = await this.columnRepository.find({
      where: { user: { id: userId } },
    });
    if (columns.length === 0 ) {
      throw new NotFoundException('Колонки не найдены');
    }
    return columns;
  }

  async findById(id: number): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
    return column;
  }

  async create(userId:number, dto: CreateColumnDto): Promise<boolean> {
    const { title, color } = dto;
    const user = await this.userService.findById(userId);
    const column = this.columnRepository.create({
      title,
      color,
      user,
    });
    this.columnRepository.save(column);
    return true;
  }

  async delete(userId: number, id: number): Promise<boolean> {
    const column = await this.findById(id);
    
    if(column.userId !== userId){
      throw new ConflictException('Пользователь не является владельцем колонки')
    }
    this.columnRepository.remove(column);
    return true;
  }
}
