import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from "../jwt-payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt')['jwt_secret'],
    });
  }

  async validate(jwtPayload: JWTPayload) {

    const userid = jwtPayload.sub;
    const user = await this.usersService.findOne(userid);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}