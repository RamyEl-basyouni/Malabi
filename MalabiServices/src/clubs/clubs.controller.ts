import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { SportType, GroundType } from '../entities/ground.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Get()
  async findAll(
    @Query('sportType') sportType?: SportType,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('groundType') groundType?: GroundType,
  ) {
    const filters: any = {};

    if (sportType) {
      filters.sportType = sportType;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.priceRange = { min: minPrice, max: maxPrice };
    }

    if (groundType) {
      filters.groundType = groundType;
    }

    return this.clubsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clubsService.findOne(+id);
  }
}
