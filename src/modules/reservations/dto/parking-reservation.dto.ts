export class ParkingReservationDto {
    id: string;
    user_id: string;
    space_id: string;
    start_time: number;
    end_time: number;
    status: string;
    qr_code: Text;
}
