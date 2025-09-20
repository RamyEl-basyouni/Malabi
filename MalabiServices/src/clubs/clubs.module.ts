import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { Club } from '../entities/club.entity';
import { Ground } from '../entities/ground.entity';
import { Review } from '../entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Ground, Review])],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
