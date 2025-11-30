import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<boolean> {
    const { name, email, password } = dto;
    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: await hash(password),
    });

    this.userRepository.save(user);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findById(id);
    this.userRepository.remove(user);
    return true;
  }
}
