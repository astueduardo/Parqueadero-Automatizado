import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities/parking.entity';
import { ParkingLot } from '../entities/parking-Lot.entity';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(Favorite)
        private readonly favoritesRepository: Repository<Favorite>,

        @InjectRepository(ParkingLot)
        private readonly parkingRepository: Repository<ParkingLot>,
    ) { }

    // ❤️ AGREGAR FAVORITO
    async addFavorite(userId: string, parkingId: string) {
        const favorite = this.favoritesRepository.create({
            user: { id: userId },
            parking: { id: parkingId },
        });

        return this.favoritesRepository.save(favorite);
    }

    // ❌ QUITAR FAVORITO
    async removeFavorite(userId: string, parkingId: string) {
        const favorite = await this.favoritesRepository.findOne({
            where: {
                user: { id: userId },
                parking: { id: parkingId },
            },
            relations: ['user', 'parking'],
        });

        if (!favorite) {
            throw new NotFoundException('Favorito no encontrado');
        }

        return this.favoritesRepository.remove(favorite);
    }

    // 📋 LISTAR FAVORITOS
    async getFavorites(userId: string) {
        return this.favoritesRepository.find({
            where: { user: { id: userId } },
            relations: ['parking'],
        });
    }
}
