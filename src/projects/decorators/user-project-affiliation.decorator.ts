import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Affiliation, UserProjectAffiliationType, AffiliationQueryParam } from "../types/user-project-affiliation";

export const UserProjectAffiliation = createParamDecorator(
    (data: string, ctx: ExecutionContext): UserProjectAffiliationType => {
      const request = ctx.switchToHttp().getRequest();
      const affiliation: UserProjectAffiliationType = request.query[AffiliationQueryParam];
      if (affiliation === Affiliation.OWNER ) {
          return affiliation;
      }
      return Affiliation.ANY;
    },
  );