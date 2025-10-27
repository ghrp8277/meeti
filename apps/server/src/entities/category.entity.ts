import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'categories',
  comment: '카테고리 정보',
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: '카테고리 이름',
  })
  name: string;

  @Column({
    name: 'parentId',
    type: 'int',
    nullable: true,
    comment: '부모 카테고리 ID',
  })
  parentId: number;

  @Column({
    name: 'seq',
    type: 'int',
    nullable: false,
    default: 0,
    comment: '순서',
  })
  seq: number;
}
