import { Exclude } from "class-transformer";
import { WorkTimeLog } from "src/work-time-logs/entities/work-time-log.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserResponseDto } from "../dto/user-response.dto";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Exclude()
    @Column({ type: 'varchar', select: false })
    password: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    name?: string;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string;

    @Column({ type: 'integer', nullable: true })
    phoneNumber?: number;

    @OneToMany(() => WorkTimeLog, workTimeLog => workTimeLog.user )
    workTimeLogs?: WorkTimeLog[]

    @BeforeInsert()
    async processPassword() {
        if (!this.password) {
            return;
        }
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    static toDto(user: User): UserResponseDto {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            lastName: user.lastName,
            name: user.name,
        }

    }
}



