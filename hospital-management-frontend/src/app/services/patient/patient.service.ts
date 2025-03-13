// src/app/services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../models/patient.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}patients`;

  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatient(id: number) {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: Patient) {
    return this.http.post(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: Patient) {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  assignDoctor(patientId: number, doctorId: number) {
    return this.http.post(
      `${this.apiUrl}/${patientId}/assign-doctor/${doctorId}`,
      {}
    );
  }
}
