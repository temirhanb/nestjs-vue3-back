import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiParam} from "@nestjs/swagger";
import {AddBlockItemDto, BlockItemDto, BlockListDto, BlockListQueryDto} from "./dto";
import {AuthGuard} from "../auth/auth.guard";
import {SessionInfoDecorator} from "../auth/session-info.decorator";
import {GetSessionInfoDto} from "../auth/dto";
import {BlockListService} from "./block-list.service";

@Controller("block-list")
@UseGuards(AuthGuard)
export class BlockListController {

  constructor(private blockListService: BlockListService) {
  }

  @Get()
  @ApiOkResponse({
    type: BlockListDto
  })
  getList(
    @Query() query: BlockListQueryDto,
    @SessionInfoDecorator() session: GetSessionInfoDto
  ): Promise<BlockListDto> {
    return this.blockListService.getByUser(session.id, query);
  }

  @Post("item")
  @ApiCreatedResponse({type: BlockItemDto})
  addBlockItem(@Body() body: AddBlockItemDto, @SessionInfoDecorator() session: GetSessionInfoDto): Promise<BlockItemDto> {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete("item/:id")
  @ApiOkResponse({type: BlockItemDto})
  async removeBlockItem(@Param("id", ParseIntPipe) id: number, @SessionInfoDecorator() session: GetSessionInfoDto): Promise<BlockItemDto> {
    return await this.blockListService.removeItem(session.id, id);
  }
}
