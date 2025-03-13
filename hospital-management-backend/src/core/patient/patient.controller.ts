import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatient: CreatePatientDto) {
    return this.patientService.create(createPatient);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatient: UpdatePatientDto,
  ) {
    return this.patientService.update(+id, updatePatient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  @Post(':patientId/assign-doctor/:doctorId')
  assignDoctor(
    @Param('patientId') patientId: string,
    @Param('doctorId') doctorId: string,
  ) {
    return this.patientService.assignDoctor(+patientId, +doctorId);
  }
}
