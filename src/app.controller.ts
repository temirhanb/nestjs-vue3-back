import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";
import {DbService} from "./db/db.service";
import {ApiOkResponse, ApiProperty} from "@nestjs/swagger";

class HelloWorldDto {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private dbService: DbService) {
  }

  @Get()
  @ApiOkResponse({
    type: HelloWorldDto,
  })
  async getHello(): Promise<HelloWorldDto> {
    const user = this.dbService.user.findMany({});

    return {message: this.appService.getHello()};
  }
}
