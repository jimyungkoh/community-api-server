import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  title: string;

  @Column({ length: 200, nullable: false })
  content: string;

  @Column({ nullable: false })
  password: string;

  /**
   * @todo weather api 사용시 필드 주석 해제하기
   * @type {string}
   * */
  //  @Column({ nullable: false })
  //  weather: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
