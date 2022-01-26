import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";
import { JWTPayload } from "./jwt-payload";
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

@Injectable()
export class TokenService {
  
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
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

  async generatePairTokens(
    user: User, 
    expireRefreshTokenTimeInSec: number
  ): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user, expireRefreshTokenTimeInSec);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
  
  async generateRefreshToken(
    user: User,
    expiresTimeSeconds: number,
  ): Promise<string> {
    let expiration = new Date();
    const expiresTimeMili = expiresTimeSeconds * 1000;
    expiration.setTime(expiration.getTime() + expiresTimeMili);
    
    const tempEntity = this.refreshTokenRepository.create();
    tempEntity.user = user;
    tempEntity.isRevoked = false;
    tempEntity.expires = expiration;
  
    const refreshTokenEntity = await this.refreshTokenRepository.save(tempEntity);

    const opts: SignOptions = {
      expiresIn: expiresTimeSeconds,
      subject: String(user.username),
      jwtid: String(refreshTokenEntity.id),
    };

    return this.jwtService.signAsync({}, opts);
    
  }

  async decodeRefreshToken(refreshTokenEncoded: string): Promise<RefreshTokenPayload> {
    try {
      const tempPayload: RefreshTokenPayload = await this.jwtService.verifyAsync(refreshTokenEncoded);
      return {
        sub: tempPayload.sub,
        jti: tempPayload.jti,
      };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
    }
  }

  extractUserNameFromTokenPayload(payload: RefreshTokenPayload): string {
    const username = payload.sub
    if (!username) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }
    return username;
  }

  getRefreshTokenEntity(payload: RefreshTokenPayload): Promise<RefreshToken> {
    const tokenId = payload.jti;
    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }
    return this.refreshTokenRepository.findOne(tokenId);
  }

  async revokeRefreshToken(refreshToken: RefreshToken) {
    refreshToken.revoke(); 
    await this.refreshTokenRepository.save(refreshToken)
  }
  
}
