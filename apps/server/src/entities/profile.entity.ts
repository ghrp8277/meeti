import { BaseEntity } from './base.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'profiles',
  comment: '프로필 정보',
})
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nickname',
    type: 'varchar',
    nullable: false,
    comment: '닉네임',
  })
  nickname: string;

  @Column({
    name: 'score',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 36.5,
    comment: '내 점수',
  })
  score: number;

  @Column({
    name: 'userId',
    type: 'varchar',
    nullable: false,
    comment: '사용자 ID',
  })
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;
}
