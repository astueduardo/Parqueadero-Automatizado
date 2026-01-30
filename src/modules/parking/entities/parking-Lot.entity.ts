import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ParkingSpace } from "./parking-space.entity";
import { NumericType } from "typeorm/browser";

@Entity("parking_lots")
export class ParkingLot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  total_spaces: number;

  @Column()
  available_spaces: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  price: string;

  @Column()
  rating: number;

  @OneToMany(() => ParkingSpace, (space) => space.lot)
  spaces: ParkingSpace[];
}
