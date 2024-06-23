import { BaseEntity } from 'src/entities';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  cover: string;

  @Column('text', {
    array: true,
  })
  tags: string[];

  @ManyToOne(() => User, {
    nullable: true,
  })
  author: User;
}
