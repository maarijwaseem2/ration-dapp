import { Claim } from 'src/claim/entities/claim.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string; // 'user' or 'admin'

  @OneToMany(() => Claim, claim => claim.user)
claims: Claim[];
}