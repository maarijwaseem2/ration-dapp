import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
nic: string;

  @Column("simple-array")
  items: string[];

  @Column({ default: 'pending' })
  status: string; // pending, approved, rejected

  @Column({ unique: true, nullable: true })
walletAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

  @ManyToOne(() => User, user => user.claims, { eager: false })
user: User;
}