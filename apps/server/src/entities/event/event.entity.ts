import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Card } from '../card.entity';

@Entity({
  name: 'events',
  comment: '이벤트',
})
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'categoryId',
    type: 'int',
    comment: '카테고리 ID',
  })
  categoryId: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    comment: '이벤트 이름',
  })
  name: string;

  // YYYY.MM.DD HH:MM:SS
  @Column({
    name: 'startDate',
    type: 'varchar',
    length: 19,
    nullable: false,
    comment: '시작일시',
  })
  startDate: Date;

  // 좌석등급
  @Column({
    name: 'seatGrade',
    type: 'varchar',
    nullable: false,
    comment: '좌석등급',
  })
  seatGrade: string;

  // 좌석 위치
  @Column({
    name: 'seatLocation',
    type: 'varchar',
    nullable: false,
    comment: '좌석 위치',
  })
  seatLocation: string;

  // 구역
  @Column({
    name: 'area',
    type: 'varchar',
    nullable: false,
    comment: '구역',
  })
  area: string;

  // 열
  @Column({
    name: 'row',
    type: 'int',
    nullable: false,
    comment: '열',
  })
  row: number;

  // 기타 정보
  @Column({
    name: 'etcInfo',
    type: 'text',
    length: 1000,
    nullable: true,
    comment: '기타 정보',
  })
  etcInfo: string;

  // 판매수
  @Column({
    name: 'saleCount',
    type: 'int',
    nullable: false,
    comment: '판매수',
  })
  saleCount: number;

  // 장당 판매금액
  @Column({
    name: 'salePrice',
    type: 'int',
    nullable: false,
    comment: '장당 판매금액',
  })
  salePrice: number;

  @Column({
    name: 'cardId',
    type: 'int',
    nullable: true,
    comment: '정산·취소 수수료 카드 ID',
  })
  cardId: number;

  @OneToOne(() => Card, { nullable: true })
  @JoinColumn({ name: 'cardId' })
  card: Card;
}
