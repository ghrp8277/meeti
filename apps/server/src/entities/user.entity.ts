import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Gender } from '../enums/gender.enum';
import { Profile } from './profile.entity';
import { Exposure } from './exposure.entity';
import { Point } from './point.entity';
import { Card } from './card.entity';
import { SettlementAccount } from './settlement-account.entity';
import { UserTosAgreement } from './user-tos-agreement.entity';

@Entity({
  name: 'users',
  comment: '유저 정보',
  synchronize: true,
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    comment: '이메일',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    comment: '비밀번호',
  })
  password: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    comment: '이름',
  })
  name: string;

  @Column({
    name: 'birthDate',
    type: 'date',
    nullable: true,
    comment: '생년월일 (YYYY-MM-DD)',
  })
  birthDate: Date;

  @Column({
    name: 'phoneNumber',
    type: 'varchar',
    nullable: true,
    comment: '휴대폰번호',
    length: 11,
    unique: true,
  })
  mobile: string;

  @Column({
    name: 'gender',
    type: 'varchar',
    nullable: true,
    comment: '성별',
  })
  gender: Gender;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @OneToMany(() => Exposure, (exposure) => exposure.user, { cascade: true })
  exposures: Exposure[];

  @OneToMany(() => Point, (point) => point.user, { cascade: true })
  points: Point[];

  @OneToMany(() => Card, (card) => card.user, { cascade: true })
  cards: Card[];

  @OneToMany(() => SettlementAccount, (account) => account.user, {
    cascade: true,
  })
  settlementAccounts: SettlementAccount[];

  @OneToMany(() => UserTosAgreement, (agreement) => agreement.user, {
    cascade: true,
  })
  tosAgreements: UserTosAgreement[];
}
