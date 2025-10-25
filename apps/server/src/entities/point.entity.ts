import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({
  name: 'points',
  comment: '포인트 정보',
})
export class Point extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'userId',
    type: 'varchar',
    nullable: false,
    comment: '사용자 ID',
  })
  userId: string;

  @Column({
    name: 'point',
    type: 'int',
    nullable: false,
    default: 0,
    comment: '포인트 (양수: 적립, 음수: 차감)',
  })
  point: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    comment: '포인트 설명',
  })
  description: string;

  @ManyToOne(() => User, (user) => user.points)
  @JoinColumn({ name: 'userId' })
  user: User;
}
