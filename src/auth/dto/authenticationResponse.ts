import { ApiProperty } from "@nestjs/swagger";

export class TokensPayload {
    @ApiProperty()
    type: string;
    @ApiProperty()
    token: string;
    @ApiProperty()
    refresh_token?: string;
}

export class RenewAccessTokenResponse {
    @ApiProperty()
    username: string;
    @ApiProperty()
    payload: TokensPayload;
}