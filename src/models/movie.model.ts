import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class MovieModel {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  synopsis: string;

  @Column()
  duration: number;

  @Column()
  director: string;
}
