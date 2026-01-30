import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto) {
        return this.authService.login(dto);
    }

    @Post('google')
    googleLogin(@Body('idToken') idToken: string) {
        return this.authService.googleLoginWithToken(idToken);
    }


    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: any) {
        const profile = req.user as any;
        const tokenPayload = await this.authService.googleLoginFromProfile({
            googleId: profile.id || profile.id,
            email: profile.email,
            name: profile.name,
        });

        // Redirect to frontend with token as query param (configurable via FRONTEND_URL)
        const frontend = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
        const redirectUrl = `${frontend}/auth/success?token=${encodeURIComponent(tokenPayload.access_token)}`;
        return res.redirect(redirectUrl);
    }
}
