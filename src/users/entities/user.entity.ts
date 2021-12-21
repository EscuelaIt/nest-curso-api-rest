import { Exclude } from "class-transformer";
import { WorkTimeLog } from "src/work-time-logs/entities/work-time-log.entity";
import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserResponseDto } from "../dto/user-response.dto";
import * as bcrypt from 'bcrypt';
import { UserProfile } from "./user-profile.entity";
import { profile } from "console";

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

    @OneToOne(() => UserProfile, profile => profile.user)
    profile: UserProfile;

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
            fullname: `${user.profile.name} ${user.profile.lastName}`,
            technologies: user.profile.technologies
            /*lastName: user.lastName,
            name: user.name,*/
        }

    }
}



