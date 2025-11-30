import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { ColumnModule } from 'src/column/column.module';
import { UserModule } from 'src/user/user.module';
import { CommentEntity } from './entities/comment.entity';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]),CardModule, ColumnModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService]
})
export class CommentModule {}
