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
  name: 'cards',
  comment: '카드 정보',
})
export class Card extends BaseEntity {
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
    name: 'cardNumber',
    type: 'varchar',
    nullable: false,
    length: 16,
    comment: '카드번호',
  })
  cardNumber: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    length: 2,
    comment: '비밀번호 앞 2자리',
  })
  password: string;

  @Column({
    name: 'expiryYear',
    type: 'int',
    nullable: false,
    comment: '유효기간 년도',
  })
  expiryYear: number;

  @Column({
    name: 'expiryMonth',
    type: 'int',
    nullable: false,
    comment: '유효기간 월',
  })
  expiryMonth: number;

  @Column({
    name: 'cvc',
    type: 'varchar',
    nullable: false,
    length: 3,
    comment: 'CVC',
  })
  cvc: string;

  @Column({
    name: 'birthDate',
    type: 'date',
    nullable: false,
    comment: '생년월일 (YYYY-MM-DD)',
  })
  birthDate: Date;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'userId' })
  user: User;
}
