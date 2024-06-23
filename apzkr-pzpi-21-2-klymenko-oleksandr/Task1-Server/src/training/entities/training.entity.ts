import { BaseEntity } from 'src/entities';
import { Gym } from 'src/gym/entities/gym.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Measurement } from '../../measurement/entities/measurement.entity';

@Entity()
export class Training extends BaseEntity {
  @OneToMany(() => Measurement, (measurement) => measurement.training, {
    onDelete: "CASCADE"
  })
  measurements: Measurement[];

  @ManyToOne(() => User, (user) => user.trainings)
  user: User;

  @ManyToOne(() => Gym)
  gym: Gym;

  @Column({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  endDate: Date;

  @Column({
    nullable: true
  })
  recommendations: string;
}
