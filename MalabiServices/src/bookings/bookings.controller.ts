import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: {
    userId: number;
    groundId: number;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.bookingsService.findByUser(+userId);
  }

  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }
}
