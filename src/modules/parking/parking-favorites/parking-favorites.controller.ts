import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './parking-favorites.services';
import { JwtAuthGuard } from '@/common';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post(':parkingId')
  addFavorite(@Req() req, @Param('parkingId') parkingId: string) {
    return this.favoritesService.addFavorite(req.user.id, parkingId);
  }

  @Delete(':parkingId')
  removeFavorite(@Req() req, @Param('parkingId') parkingId: string) {
    return this.favoritesService.removeFavorite(req.user.id, parkingId);
  }

  @Get()
  getFavorites(@Req() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }
}
