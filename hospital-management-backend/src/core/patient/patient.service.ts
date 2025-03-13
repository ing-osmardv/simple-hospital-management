import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private doctorService: DoctorService,
  ) {}

  async create(createPatient: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatient);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ relations: ['doctor'] });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }

    return patient;
  }

  async update(
    id: number,
    updatePatient: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatient);
    return this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
  }

  async assignDoctor(patientId: number, doctorId: number): Promise<Patient> {
    const patient = await this.findOne(patientId);
    const doctor = await this.doctorService.findOne(doctorId);

    if(!doctor){
      throw new NotFoundException(`Doctor con ID ${doctorId} no encontrado`);
    }

    patient.doctor = doctor;
    return this.patientRepository.save(patient);
  }
}
