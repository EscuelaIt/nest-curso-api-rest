import { ApiProperty } from "@nestjs/swagger";

export class TokensPayload {
    @ApiProperty()
    type: string;
    @ApiProperty()
    token: string;
    @ApiProperty()
    refresh_token?: string;
}