import { Tweet } from 'src/tweets/entities/tweet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('temporary_file_handle')
export class FileHandle {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare userId: number;

  @Column()
  declare public_id: string;

  @Column({ default: false })
  declare isUsed: boolean;

  @Column()
  declare filePath: string;

  @Column()
  declare fileType: string;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}
