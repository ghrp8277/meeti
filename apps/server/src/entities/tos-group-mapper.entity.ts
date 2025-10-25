import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { TosGroup } from './tos-group.entity';
import { Tos } from './tos.entity';

@Entity({
  name: 'tos_group_mappers',
  comment: '약관 그룹 매핑 정보',
})
export class TosGroupMapper extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'tosGroupId',
    type: 'int',
    nullable: false,
    comment: '약관 그룹 ID',
  })
  tosGroupId: number;

  @Column({
    name: 'tosId',
    type: 'int',
    nullable: false,
    comment: '약관 ID',
  })
  tosId: number;

  @Column({
    name: 'seq',
    type: 'int',
    nullable: false,
    default: 0,
    comment: '그룹 내 순서',
  })
  seq: number;

  @Column({
    name: 'isRequired',
    type: 'boolean',
    nullable: false,
    default: false,
    comment: '그룹 내 필수 여부',
  })
  isRequired: boolean;

  @ManyToOne(() => TosGroup, { eager: false })
  @JoinColumn({ name: 'tosGroupId' })
  tosGroup: TosGroup;

  @ManyToOne(() => Tos, { eager: false })
  @JoinColumn({ name: 'tosId' })
  tos: Tos;
}
