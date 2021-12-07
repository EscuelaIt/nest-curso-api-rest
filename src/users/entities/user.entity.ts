import { Exclude } from "class-transformer";
import { WorkTimeLog } from "src/work-time-logs/entities/work-time-log.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @OneToMany(() => WorkTimeLog, workTimeLog => workTimeLog.user )
    workTimeLogs?: WorkTimeLog[]
}
