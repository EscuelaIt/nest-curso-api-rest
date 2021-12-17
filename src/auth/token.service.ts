import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import { JWTPayload } from "./jwt-payload";
// import { JWTPayload } from "./jwt-payload";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    // Firma del token
    return this.jwtService.sign(payload);
  }
  
  
}
