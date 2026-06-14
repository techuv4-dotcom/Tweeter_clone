import { text } from 'node:stream/consumers';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (users) => users.tweets)
  user!: User;

  @Column({
    length:280
  })
  tweet!:string;

  @Column('simple-json', {
    nullable: true,
  })
  urls!: string[];

  @Column(`simple-json`, { nullable: true })
  declare public_id: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
