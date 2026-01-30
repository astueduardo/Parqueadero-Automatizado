import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./entities/parking-reservatio.entity";
import { ParkingReservationDto } from "./dto/parking-reservation.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepo: Repository<Reservation>,
    ) { }

    async create(userId: string, dto: ParkingReservationDto) {
        const reservation = this.reservationRepo.create({
            user_id: userId,
            space_id: dto.space_id,
            start_time: new Date(dto.start_time),
            end_time: new Date(dto.end_time),
            status: "pending",
            qr_code: uuid(), // luego puedes generar QR real
        });

        return this.reservationRepo.save(reservation);
    }

    async findByUser(userId: string) {
        return this.reservationRepo.find({
            where: { user_id: userId },
            relations: ["space"],
            order: { created_at: "DESC" },
        });
    }

    async findOne(id: string) {
        return this.reservationRepo.findOne({
            where: { id },
            relations: ["space", "user"],
        });
    }
}
