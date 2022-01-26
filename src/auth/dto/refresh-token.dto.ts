import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty()
    readonly refreshToken: string;
}