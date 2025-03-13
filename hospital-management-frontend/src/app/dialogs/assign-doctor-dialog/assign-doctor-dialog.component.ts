import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-doctor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './assign-doctor-dialog.component.html',
  styleUrl: './assign-doctor-dialog.component.css',
})
export class AssignDoctorDialogComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctorId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AssignDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number },
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => (this.doctors = doctors),
      error: () => console.error('Failed to load doctors'),
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAssign() {
    if (this.selectedDoctorId) {
      this.dialogRef.close(this.selectedDoctorId);
    }
  }
}
