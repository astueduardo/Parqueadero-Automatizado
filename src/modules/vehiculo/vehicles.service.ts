import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "../vehiculo/entities/vehicle.entity";
import { CreateVehicleDto } from "./db/create-vehicle.dto";
import { UpdateVehicleDto } from "./db/update-vehicle.dto";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) { }

  async update(
    id: string,
    userId: string,
    dto: UpdateVehicleDto
  ) {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id, user_id: userId },
    });

    if (!vehicle) {
      throw new BadRequestException("Vehículo no encontrado");
    }

    // Si se marca como activo, desactivar los demás
    if (dto.is_active) {
      await this.vehicleRepo.update(
        { user_id: userId },
        { is_active: false }
      );
    }

    Object.assign(vehicle, dto);
    return this.vehicleRepo.save(vehicle);
  }


  async create(userId: string, dto: CreateVehicleDto) {
    // Validar placa duplicada por usuario
    const exists = await this.vehicleRepo.findOne({
      where: { plate_number: dto.plate_number, user_id: userId },
    });

    if (exists) {
      throw new BadRequestException("La placa ya está registrada");
    }

    // Si es default → desmarcar los otros
    if (dto.is_active) {
      await this.vehicleRepo.update(
        { user_id: userId },
        { is_active: false }
      );
    }

    const vehicle = this.vehicleRepo.create({
      ...dto,
      user_id: userId,
    });

    return this.vehicleRepo.save(vehicle);
  }

  async findByUser(userId: string) {
    return this.vehicleRepo.find({
      where: { user_id: userId },
      order: { created_at: "DESC" },
    });
  }

  async findOne(id: string, userId: string) {
    return this.vehicleRepo.findOne({
      where: { id, user_id: userId },
    });
  }

  async delete(id: string, userId: string) {
    return this.vehicleRepo.delete({ id, user_id: userId });
  }
}
