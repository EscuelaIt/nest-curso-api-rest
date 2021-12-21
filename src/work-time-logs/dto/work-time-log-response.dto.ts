import { UserResponseDto } from "src/users/dto/user-response.dto";

export class WorkTimeLogResponseDto {
    id: string;
    hours: number;
    date: Date;
    user: UserResponseDto;
}