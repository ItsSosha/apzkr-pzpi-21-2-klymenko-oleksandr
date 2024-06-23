import { BaseEntity } from 'src/entities';
import { Training } from '../../training/entities/training.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Measurement extends BaseEntity {
  @Column()
  heartRate: number;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  temperature: number;

  @Column({
    type: 'timestamptz',
  })
  date: Date;

  @ManyToOne(() => Training, (training) => training.measurements)
  training: Training;
}
