import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from 'src/column/column.service';
import { CardEntity } from './entities/card.entity';
import { ColumnModule } from 'src/column/column.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([CardEntity,]),ColumnModule,UserModule],
  controllers: [CardController],
  providers: [CardService,],
  exports:[CardService]
})
export class CardModule {}
