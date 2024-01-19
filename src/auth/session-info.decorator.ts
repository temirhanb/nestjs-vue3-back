import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const SessionInfoDecorator = createParamDecorator((_, ctx: ExecutionContext) =>
  (ctx.switchToHttp().getRequest().session)
);