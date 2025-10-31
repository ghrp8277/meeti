import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'banks',
  comment: '은행정보',
})
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '은행코드',
  })
  code: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '은행이름',
  })
  name: string;
}
