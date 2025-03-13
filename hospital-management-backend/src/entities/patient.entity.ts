import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  diagnostic: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.patients)
  doctor: Doctor;
}