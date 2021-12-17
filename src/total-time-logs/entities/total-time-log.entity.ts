import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class TotalTimeLog {
    @ApiProperty()
    id: string;
    @ApiProperty()
    totalHours: number;
    @ApiProperty()
    user: User;
    @ApiProperty()    
    project: Project;
}
