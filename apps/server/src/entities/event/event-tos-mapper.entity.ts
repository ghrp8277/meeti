import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({
  name: 'event_tos_mappers',
  comment: '이벤트 약관 매핑 정보',
})
export class EventTosMapper extends BaseEntity {
  @PrimaryColumn({
    name: 'eventId',
    type: 'int',
    nullable: false,
    comment: '이벤트 ID',
  })
  eventId: number;

  @PrimaryColumn({
    name: 'tosId',
    type: 'int',
    nullable: false,
    comment: '약관 ID',
  })
  tosId: number;
}
