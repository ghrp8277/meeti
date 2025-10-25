import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'notices',
  comment: '공지사항',
})
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false,
    comment: '공지사항 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
    comment: '공지사항 내용',
  })
  content: string;
}
