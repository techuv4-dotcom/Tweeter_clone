import { Tweet } from 'src/tweets/entities/tweet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @OneToMany(() => Tweet, (tweets) => tweets.user)
  tweets!: Tweet[];

  @Column({ unique: true })
  declare email: string;

  @Column({
    default: 0,
    type: 'tinyint',
  })
  declare is_verification: number;

  @Column({ default: 121212 })
  declare otp: string;

  @Column()
  declare password: string;
}
