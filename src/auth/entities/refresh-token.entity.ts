import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";


@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_revoked' })
  isRevoked: boolean;

  @Column()
  expires: Date;

  @Column({ name: 'user' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user', referencedColumnName: 'id'})
  user: User;

  revoke() {
    this.isRevoked = true;
  }
}