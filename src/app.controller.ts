import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/role.guard';
import { CONSTANTS } from './constants';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    //authentication complete
    // next step authorize
    // id card jwt token

    return this.authService.generateToken(req.user);
  }

  @Get('/android-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))
  androidDeveloperData(@Request() req): string {
    return (
      'this is private data for android developer' + JSON.stringify(req.user)
    );
  }

  @Get('/web-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
  webDeveloperData(@Request() req): string {
    return 'this is private data for web developer' + JSON.stringify(req.user);
  }
  @Get('/backend-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.BACKEND_DEVELOPER))
  backendDeveloperData(@Request() req): string {
    return (
      'this is private data for backend developer' + JSON.stringify(req.user)
    );
  }
}
