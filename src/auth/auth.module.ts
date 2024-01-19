import * as process from "process";
import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PasswordService} from "./password.service";
import {CookieService} from "./cookie.service";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService]
})
export class AuthModule {
}
