import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const AuthUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user: User = request.user;
      if (!user) {
        throw new BadRequestException();
      }
      return user;
    },
);