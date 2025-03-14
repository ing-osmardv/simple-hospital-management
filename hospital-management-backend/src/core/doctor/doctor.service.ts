// src/doctor/doctor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Patient } from 'src/entities/patient.entity';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctor: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDoctor);
    return this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({ relations: ['patients'] });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['patients'],
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${id} no encontrado`);
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    Object.assign(doctor, updateDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepository.remove(doctor);
  }

  async getPatientsByDoctorId(doctorId: number): Promise<Patient[]> {
    const doctor = await this.findOne(doctorId);
    return doctor.patients;
  }
}
