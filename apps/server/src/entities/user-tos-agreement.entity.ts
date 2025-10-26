import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Tos } from './tos.entity';

@Entity({
  name: 'user_tos_agreements',
  comment: '사용자 약관 동의 정보',
})
export class UserTosAgreement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'userId',
    type: 'uuid',
    comment: '사용자 ID',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'tosId',
    type: 'int',
    comment: '약관 ID',
    nullable: false,
  })
  tosId: number;

  @ManyToOne(() => User, (user) => user.tosAgreements)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tos)
  @JoinColumn({ name: 'tosId' })
  tos: Tos;
}
