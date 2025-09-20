import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../entities/club.entity';
import { Ground, SportType, GroundType } from '../entities/ground.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class ClubsService implements OnModuleInit {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async findAll(filters?: {
    sportType?: SportType;
    priceRange?: { min: number; max: number };
    distance?: number;
    groundType?: GroundType;
  }) {
    const query = this.clubRepository.createQueryBuilder('club')
      .leftJoinAndSelect('club.grounds', 'ground')
      .leftJoinAndSelect('club.reviews', 'review');

    if (filters?.sportType) {
      query.andWhere('ground.sportType = :sportType', { sportType: filters.sportType });
    }

    if (filters?.priceRange) {
      query.andWhere('ground.pricePerHour BETWEEN :min AND :max', {
        min: filters.priceRange.min,
        max: filters.priceRange.max,
      });
    }

    if (filters?.groundType) {
      query.andWhere('ground.groundType = :groundType', { groundType: filters.groundType });
    }

    return query.getMany();
  }

  async findOne(id: number) {
    return this.clubRepository.findOne({
      where: { id },
      relations: ['grounds', 'reviews'],
    });
  }

  private async seedData() {
    const clubCount = await this.clubRepository.count();
    if (clubCount > 0) return;

    const sampleClubs = [
      {
        name: 'Al Hilal Sports City',
        address: 'King Fahd District, Riyadh, Saudi Arabia',
        description: 'Premium sports complex with world-class facilities, home to Al Hilal FC training grounds',
        images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center'],
        latitude: 24.7136,
        longitude: 46.6753,
        phone: '+966112345678',
        facilities: ['VIP Parking', 'Premium Locker Rooms', 'Sports Cafe', 'Pro Shop', 'Medical Center'],
        rating: 4.9,
        grounds: [
          {
            name: 'Main Championship Field',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.GRASS,
            pricePerHour: 300,
            images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
          {
            name: 'Training Ground A',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 200,
            images: ['https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
        ],
      },
      {
        name: 'King Abdullah Sports City',
        address: 'Jeddah, Makkah Province, Saudi Arabia',
        description: 'World-class sports facility with international standard grounds and amenities',
        images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop&crop=center'],
        latitude: 21.6304,
        longitude: 39.1458,
        phone: '+966126543210',
        facilities: ['Covered Parking', 'Air-Conditioned Facilities', 'Restaurant', 'Fitness Center'],
        rating: 4.8,
        grounds: [
          {
            name: 'Stadium Pitch',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.GRASS,
            pricePerHour: 350,
            images: ['https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
          {
            name: 'Tennis Complex Court 1',
            sportType: SportType.TENNIS,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 150,
            images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center'],
            capacity: 4,
          },
        ],
      },
      {
        name: 'Prince Faisal bin Fahd Stadium Complex',
        address: 'Al Malaz, Riyadh, Saudi Arabia',
        description: 'Historic sports complex with modern amenities and multiple training facilities',
        images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=600&fit=crop&crop=center'],
        latitude: 24.6877,
        longitude: 46.7219,
        phone: '+966113456789',
        facilities: ['Free Parking', 'Locker Rooms', 'Cafeteria', 'Equipment Rental'],
        rating: 4.6,
        grounds: [
          {
            name: 'Main Training Field',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 180,
            images: ['https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
          {
            name: 'Volleyball Arena',
            sportType: SportType.VOLLEYBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 120,
            images: ['https://images.unsplash.com/photo-1594736797933-d0f4e7e2e8e0?w=800&h=600&fit=crop&crop=center'],
            capacity: 12,
          },
        ],
      },
      {
        name: 'Al Nassr Academy',
        address: 'Al Sulimaniyah, Riyadh, Saudi Arabia',
        description: 'Professional football academy with top-tier training facilities',
        images: ['https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop&crop=center'],
        latitude: 24.7478,
        longitude: 46.6528,
        phone: '+966114567890',
        facilities: ['Secure Parking', 'Professional Facilities', 'Sports Medicine', 'Video Analysis Room'],
        rating: 4.7,
        grounds: [
          {
            name: 'Academy Field 1',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.GRASS,
            pricePerHour: 250,
            images: ['https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
          {
            name: 'Youth Training Ground',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 160,
            images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&crop=center'],
            capacity: 18,
          },
        ],
      },
      {
        name: 'Dammam Sports Complex',
        address: 'Al Shatea, Dammam, Eastern Province, Saudi Arabia',
        description: 'Modern multi-sport facility serving the Eastern Province',
        images: ['https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop&crop=center'],
        latitude: 26.4282,
        longitude: 50.1059,
        phone: '+966138765432',
        facilities: ['Ample Parking', 'Modern Facilities', 'Snack Bar', 'Equipment Storage'],
        rating: 4.4,
        grounds: [
          {
            name: 'Main Football Pitch',
            sportType: SportType.FOOTBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 170,
            images: ['https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=800&h=600&fit=crop&crop=center'],
            capacity: 22,
          },
          {
            name: 'Tennis Court Complex',
            sportType: SportType.TENNIS,
            groundType: GroundType.CLAY,
            pricePerHour: 100,
            images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&fit=crop&crop=center'],
            capacity: 4,
          },
          {
            name: 'Beach Volleyball Court',
            sportType: SportType.VOLLEYBALL,
            groundType: GroundType.SYNTHETIC,
            pricePerHour: 90,
            images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'],
            capacity: 12,
          },
        ],
      },
    ];

    for (const clubData of sampleClubs) {
      const club = this.clubRepository.create({
        name: clubData.name,
        address: clubData.address,
        description: clubData.description,
        images: clubData.images,
        latitude: clubData.latitude,
        longitude: clubData.longitude,
        phone: clubData.phone,
        facilities: clubData.facilities,
        rating: clubData.rating,
      });

      const savedClub = await this.clubRepository.save(club);

      for (const groundData of clubData.grounds) {
        const ground = this.groundRepository.create({
          ...groundData,
          club: savedClub,
        });
        await this.groundRepository.save(ground);
      }
    }
  }
}
