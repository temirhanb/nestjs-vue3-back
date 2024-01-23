import {Body, Controller, Get, Patch, UseGuards} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {AccountDto, PatchAccountDto} from "./dto";
import {AuthGuard} from "../auth/auth.guard";
import {SessionInfoDecorator} from "../auth/session-info.decorator";
import {GetSessionInfoDto} from "../auth/dto";
import {AccountService} from "./account.service";

@Controller("account")
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {
  }

  @Get()
  @ApiOkResponse({type: AccountDto})
  getAccount(@SessionInfoDecorator() session: GetSessionInfoDto):Promise<AccountDto> {
    return this.accountService.getAccount(session.id);
  }

  @Patch()
  @ApiOkResponse({type: AccountDto})
  patchAccount(@Body() body: PatchAccountDto, @SessionInfoDecorator() session: GetSessionInfoDto):Promise<AccountDto> {
    return this.accountService.patchAccount(session.id, body);
  }
}
