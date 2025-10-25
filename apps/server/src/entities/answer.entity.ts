import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { AnswerCategory } from './answer-category.entity';

@Entity({
  name: 'answers',
  comment: '자주 묻는 질문',
})
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'question',
    type: 'varchar',
    nullable: false,
    comment: '질문',
  })
  question: string;

  @Column({
    name: 'answer',
    type: 'text',
    nullable: false,
    comment: '답변',
  })
  answer: string;

  @Column({
    name: 'categoryId',
    type: 'int',
    nullable: false,
    comment: '카테고리 ID',
  })
  categoryId: number;

  @ManyToOne(() => AnswerCategory)
  @JoinColumn({ name: 'categoryId' })
  category: AnswerCategory;
}
