import {Injectable} from "@nestjs/common";
import {PatchAccountDto} from "./dto";
import {DbService} from "../db/db.service";

@Injectable()
export class AccountService {
  constructor(private db: DbService) {
  }

  async getAccount(userId: number) {
    return this.db.account.findUniqueOrThrow({where: {ownerId: userId}});
  }

  async patchAccount(userId: number, patch: PatchAccountDto) {
    return this.db.account.update({
      where: {ownerId: userId},
      data: {...patch}
    });
  }

  async createAccount(userId: number) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false
      }
    });
  }
}
