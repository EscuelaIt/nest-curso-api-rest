import { TokensPayload } from "./authenticationResponse";

export class LoginResponseDto {
    payload: TokensPayload;
    username: string;
}