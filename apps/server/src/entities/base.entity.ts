import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'createdAt',
    type: 'datetime',
    comment: '생성일시',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'datetime',
    comment: '수정일시',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'datetime',
    nullable: true,
    comment: '삭제일시',
  })
  deletedAt: Date;

  @Column({
    name: 'createdById',
    type: 'int',
    nullable: true,
    comment: '생성자 ID',
  })
  createdById: number;

  @Column({
    name: 'updatedById',
    type: 'int',
    nullable: true,
    comment: '수정자 ID',
  })
  updatedById: number;

  @Column({
    name: 'deletedById',
    type: 'int',
    nullable: true,
    comment: '삭제자 ID',
  })
  deletedById: number;

  @Column({
    name: 'isActive',
    type: 'boolean',
    default: true,
    comment: '활성 상태',
  })
  isActive: boolean;

  @Column({
    name: 'isDeleted',
    type: 'boolean',
    default: false,
    comment: '삭제 상태',
  })
  isDeleted: boolean;
}
