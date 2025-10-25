import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'answer_categories',
  comment: '자주 묻는 질문 카테고리',
})
export class AnswerCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    comment: '카테고리명',
  })
  name: string;

  @Column({
    name: 'sortOrder',
    type: 'int',
    nullable: false,
    default: 0,
    comment: '정렬 순서',
  })
  sortOrder: number;
}
