import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ground } from './ground.entity';
import { Review } from './review.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  phone: string;

  @Column('simple-array')
  facilities: string[];

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @OneToMany(() => Ground, ground => ground.club)
  grounds: Ground[];

  @OneToMany(() => Review, review => review.club)
  reviews: Review[];
}