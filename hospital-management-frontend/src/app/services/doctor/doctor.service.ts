// src/app/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}doctors`;

  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctor(id: number) {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(doctor: Partial<Doctor>) {
    return this.http.post(this.apiUrl, doctor);
  }

  updateDoctor(id: number, doctor: Partial<Doctor>) {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
