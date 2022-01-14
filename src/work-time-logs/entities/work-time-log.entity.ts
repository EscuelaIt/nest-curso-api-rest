import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { WorkTimeLogResponseDto } from "../dto/work-time-log-response.dto";

@Entity('work-time-logs')
export class WorkTimeLog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'smallint' })
    hours: number;

    @Column({ name:'date', type: 'date' })
    date: Date;

    @Exclude()
    @Column({ name: 'user_id' })
    userId: number;

    @Exclude()
    @Column({ name: 'project_id' })
    projectId: number;

    @ManyToOne(
        () => User, 
        user => user.workTimeLogs, 
        { onUpdate: 'CASCADE', onDelete: 'NO ACTION', eager: true },
    )
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(
        () => Project, 
        project => project.workTimeLogs,
        { onUpdate: 'CASCADE', onDelete: 'NO ACTION', eager: true }
    )
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id', })
    project: Project;

    static toDto(wtl: WorkTimeLog): WorkTimeLogResponseDto {
        return {
            id: wtl.id,
            date: wtl.date,
            hours: wtl.hours,
            user: User.toDto(wtl.user)
        }

    }

}
