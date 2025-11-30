import { CardEntity } from 'src/card/entities/card.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
  card: CardEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'SET NULL', nullable:true })
  user: UserEntity;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
