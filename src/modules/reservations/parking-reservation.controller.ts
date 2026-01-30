import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
    Param,
} from "@nestjs/common";
import { ReservationsService } from "./parking-reservation.service";
import { ParkingReservationDto } from "./dto/parking-reservation.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("reservations")
@UseGuards(AuthGuard("jwt"))
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Post()
    create(@Req() req, @Body() dto: ParkingReservationDto) {
        return this.reservationsService.create(req.user.id, dto);
    }

    @Get("my")
    findMyReservations(@Req() req) {
        return this.reservationsService.findByUser(req.user.id);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.reservationsService.findOne(id);
    }
}
