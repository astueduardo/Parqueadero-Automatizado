import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ParkingSpace } from "../../parking/entities/parking-space.entity";

@Entity("reservations")
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /* Usuario */
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column("uuid")
    user_id: string;

    /* Espacio */
    @ManyToOne(() => ParkingSpace, { onDelete: "CASCADE" })
    @JoinColumn({ name: "space_id" })
    space: ParkingSpace;

    @Column("uuid")
    space_id: string;

    /* Fechas */
    @Column({ type: "timestamp" })
    start_time: Date;

    @Column({ type: "timestamp" })
    end_time: Date;

    /* Estado */
    @Column({ length: 20, default: "pending" })
    status: string;

    /* QR */
    @Column("text")
    qr_code: string;

    /* Pago */
    @Column("uuid", { nullable: true })
    payment_id?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    @Column("uuid")
    vehicle_id: string;
}
