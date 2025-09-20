import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Club } from './club.entity';
import { Booking } from './booking.entity';

export enum SportType {
  FOOTBALL = 'football',
  VOLLEYBALL = 'volleyball',
  TENNIS = 'tennis',
}

export enum GroundType {
  GRASS = 'grass',
  SYNTHETIC = 'synthetic',
  CLAY = 'clay',
}

@Entity()
export class Ground {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: SportType,
  })
  sportType: SportType;

  @Column({
    type: 'simple-enum',
    enum: GroundType,
  })
  groundType: GroundType;

  @Column('decimal')
  pricePerHour: number;

  @Column('simple-array')
  images: string[];

  @Column()
  capacity: number;

  @ManyToOne(() => Club, club => club.grounds)
  club: Club;

  @OneToMany(() => Booking, booking => booking.ground)
  bookings: Booking[];
}