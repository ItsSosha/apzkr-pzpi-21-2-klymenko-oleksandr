import { Column, Entity, ManyToOne } from 'typeorm';
import { Goal } from './goal.entity';
import { BaseEntity } from 'src/entities';

@Entity()
export class GoalProgress extends BaseEntity {
  @ManyToOne(() => Goal, (goal) => goal.progresses, {
    onDelete: 'CASCADE',
  })
  goal: Goal;

  @Column()
  currentValue: number;

  @Column({
    type: 'date',
  })
  date: string;
}
