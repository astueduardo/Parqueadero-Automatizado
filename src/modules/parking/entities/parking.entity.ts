import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { ParkingLot } from './parking-Lot.entity';

@Entity("favorites")
export class Favorite {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => ParkingLot, { onDelete: "CASCADE" })
    parking: ParkingLot;

    @CreateDateColumn()
    created_at: Date;
}
