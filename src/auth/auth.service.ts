import {JwtService} from "@nestjs/jwt";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {PasswordService} from "./password.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) {
  }

  async singIn(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, findUser.salt);
    if (hash !== findUser.hash) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.signAsync({id: findUser.id, email: findUser.email});

    return {accessToken};
  }

  async singUp(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);

    if (findUser) {
      throw new BadRequestException({type: "email-exist"});
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);
    const newUser = await this.userService.create(email, hash, salt);
    const accessToken = await this.jwtService.signAsync({id: newUser.id, email: newUser.email});

    return {accessToken};
  }
}
