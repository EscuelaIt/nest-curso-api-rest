import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('user_profile')
export class UserProfile {
    @OneToOne(() => User, { primary: true, cascade: true })   
    @JoinColumn({ name: 'profile_id' })
    user: User;

    @Column({ type: 'varchar', nullable: true })
    name?: string;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string;

    @Column({ type: 'integer', nullable: true })
    phoneNumber?: number;

    @Column({ name:'technologies',  type: 'text', array: true, nullable: true })
    technologies: string[];

    @Column({ name: 'git_repos', type: 'text', array: true, nullable: true })
    gitRepos: string[];
}