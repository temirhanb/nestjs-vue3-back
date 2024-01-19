import {Response} from "express";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards} from "@nestjs/common";

import {GetSessionInfoDto, SingInBodyDto, SingUpBodyDto} from "./dto";
import {AuthService} from "./auth.service";
import {CookieService} from "./cookie.service";
import {AuthGuard} from "./auth.guard";
import {SessionInfoDecorator} from "./session-info.decorator";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService, private cookieService: CookieService) {
  }

  @Post("sing-up")
  @ApiCreatedResponse()
  async singUp(@Body() body: SingUpBodyDto, @Res({passthrough: true}) res: Response) {
    const {accessToken} = await this.authService.singUp(body.email, body.password);
    this.cookieService.setToken(res, accessToken);
  }

  @Post("sing-in")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async singIn(@Body() body: SingInBodyDto, @Res({passthrough: true}) res: Response) {
    const {accessToken} = await this.authService.singIn(body.email, body.password);
    this.cookieService.setToken(res, accessToken);
  }

  @Post("sing-out")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  singOut(@Res({passthrough: true}) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get("session")
  @ApiOkResponse({
    type: GetSessionInfoDto
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfoDecorator() session:GetSessionInfoDto) {
    return session;
  }
}
