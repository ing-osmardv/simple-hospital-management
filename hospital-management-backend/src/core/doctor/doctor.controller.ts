// src/doctor/doctor.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from '../../dto/doctor.dto';

@Controller('doctores')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: DoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: Partial<DoctorDto>) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }

  @Get(':id/pacientes')
  getPacientesByDoctorId(@Param('id') id: string) {
    return this.doctorService.getPatientsByDoctorId(+id);
  }
}
