import { BaseEntity } from './base.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { ExposureType } from '../enums/exposure-type.enum';

@Entity({
  name: 'exposures',
  comment: '노출권 정보',
})
@Unique(['userId', 'type'])
export class Exposure extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ExposureType,
    nullable: false,
    comment: '노출권 타입',
  })
  type: ExposureType;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
    default: 0,
    comment: '보유 수량',
  })
  quantity: number;

  @Column({
    name: 'userId',
    type: 'varchar',
    nullable: false,
    comment: '사용자 ID',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.exposures)
  @JoinColumn({ name: 'userId' })
  user: User;
}
