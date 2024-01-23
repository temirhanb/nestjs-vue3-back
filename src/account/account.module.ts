import {Module} from "@nestjs/common";
import {AccountController} from "./account.controller";
import {DbModule} from "../db/db.module";
import {AccountService} from "./account.service";

@Module({
  imports: [DbModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports:[AccountService]
})
export class AccountModule {
}
