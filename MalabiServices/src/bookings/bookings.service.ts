import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { Ground } from '../entities/ground.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: {
    userId: number;
    groundId: number;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    const user = await this.userRepository.findOne({ where: { id: createBookingDto.userId } });
    const ground = await this.groundRepository.findOne({
      where: { id: createBookingDto.groundId },
      relations: ['club']
    });

    if (!user || !ground) {
      throw new Error('User or Ground not found');
    }

    const startHour = parseInt(createBookingDto.startTime.split(':')[0]);
    const endHour = parseInt(createBookingDto.endTime.split(':')[0]);
    const duration = endHour - startHour;
    const totalPrice = duration * Number(ground.pricePerHour);

    const booking = this.bookingRepository.create({
      user,
      ground,
      date: new Date(createBookingDto.date),
      startTime: createBookingDto.startTime,
      endTime: createBookingDto.endTime,
      totalPrice,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepository.save(booking);
  }

  async findByUser(userId: number) {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['ground', 'ground.club'],
      order: { date: 'DESC' },
    });
  }

  async findAll() {
    return this.bookingRepository.find({
      relations: ['user', 'ground', 'ground.club'],
    });
  }
}
