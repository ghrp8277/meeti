import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TosGroupPurpose } from '../enums/tos-group-purpose.enum';

@Entity({
  name: 'tos_groups',
  comment: '약관 그룹 정보',
})
export class TosGroup extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'purpose',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '약관 그룹 용도',
  })
  purpose: TosGroupPurpose;
}
