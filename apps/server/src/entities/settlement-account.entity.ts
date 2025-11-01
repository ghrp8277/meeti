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
  name: 'settlement_accounts',
  comment: '정산 계좌 정보',
})
export class SettlementAccount extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'userId',
    type: 'varchar',
    nullable: false,
    comment: '사용자 ID',
  })
  userId: string;

  @Column({
    name: 'accountHolder',
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '예금주',
  })
  accountHolder: string;

  @Column({
    name: 'bankId',
    type: 'int',
    nullable: false,
    comment: '은행ID',
  })
  bankId: number;

  @Column({
    name: 'accountNumber',
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '계좌번호',
  })
  accountNumber: string;

  @Column({
    name: 'mobile',
    type: 'varchar',
    nullable: false,
    length: 13,
    comment: '휴대폰번호',
  })
  mobile: string;

  @ManyToOne(() => User, (user) => user.settlementAccounts)
  @JoinColumn({ name: 'userId' })
  user: User;
}
