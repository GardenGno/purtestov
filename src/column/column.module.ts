import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([ColumnEntity,]), UserModule],
  controllers: [ColumnController],
  providers: [ColumnService,],
  exports: [ColumnService]
})
export class ColumnModule {}
