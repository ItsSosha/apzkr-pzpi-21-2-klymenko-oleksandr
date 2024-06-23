import { BaseEntity } from 'src/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Gym extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;
}
