import { BaseEntity } from 'src/entities';
import { Goal } from 'src/goal/entities/goal.entity';
import { Training } from 'src/training/entities/training.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    nullable: true,
  })
  isAdmin: boolean;

  @OneToMany(() => Training, (training) => training.user)
  trainings: Training[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
