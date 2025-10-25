import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'tos',
  comment: '약관 정보',
})
export class Tos extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'code',
    type: 'varchar',
    comment: '약관 코드',
    nullable: false,
    length: 50,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '약관 제목',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '약관 템플릿',
  })
  template: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '약관 버전',
    default: 1,
  })
  version: number;
}
