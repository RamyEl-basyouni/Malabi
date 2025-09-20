import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/clubs.module';
import { BookingsModule } from './bookings/bookings.module';
import { User } from './entities/user.entity';
import { Club } from './entities/club.entity';
import { Ground } from './entities/ground.entity';
import { Booking } from './entities/booking.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'malaaby.db',
      entities: [User, Club, Ground, Booking, Review],
      synchronize: true,
    }),
    AuthModule,
    ClubsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
