import { BaseEntity } from 'src/entities';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GoalType } from '../enums/goal-type.enum';
import { GoalProgress } from './goal-progress.entity';

@Entity()
export class Goal extends BaseEntity {
  @ManyToOne(() => User, (user) => user.goals)
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'decimal',
  })
  targetValue: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: string;

  @Column({ type: 'date' })
  deadline: string;

  @Column({
    type: 'enum',
    enum: GoalType,
  })
  type: GoalType;

  @OneToMany(() => GoalProgress, (goalProgress) => goalProgress.goal, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  progresses: GoalProgress[];
}
