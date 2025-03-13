import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient/patient.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { DoctorService } from '../../services/doctor/doctor.service';
import { AssignDoctorDialogComponent } from '../../dialogs/assign-doctor-dialog/assign-doctor-dialog.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  patients: Patient[] = [];
  displayedColumns: string[] = ['name', 'age', 'diagnostic', 'actions'];
  editedPatient: number | null = null;
  isLoading = true;
  doctorId: number | null = null;

  formPatient = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    diagnostic: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.doctorId = params['id'] ? +params['id'] : null;
      this.loadPatients();
    });
  }

  private loadPatients() {
    if (this.doctorId) {
      this.doctorService.getDoctorPatients(this.doctorId).subscribe({
        next: (patients) => {
          this.patients = patients;
          this.isLoading = false;
        },
        error: () => this.handleError('Failed to load patients'),
      });
    } else {
      this.patientService.getPatients().subscribe({
        next: (patients) => {
          this.patients = patients;
          this.isLoading = false;
        },
        error: () => this.handleError('Failed to load patients'),
      });
    }
  }

  submitForm() {
    if (this.formPatient.invalid) {
      this.formPatient.markAllAsTouched();
      return;
    }

    const patientData = this.getFormData();

    if (this.editedPatient) {
      this.updatePatient(patientData);
    } else {
      this.createPatient(patientData);
    }
  }

  private getFormData(): Omit<Patient, 'id'> {
    return {
      name: this.formPatient.value.name!.trim(),
      age: this.formPatient.value.age!,
      diagnostic: this.formPatient.value.diagnostic!.trim(),
    };
  }

  private createPatient(patient: Omit<Patient, 'id'>) {
    this.patientService.createPatient(patient).subscribe({
      next: () => {
        this.handleSuccess('Patient created successfully');
        this.resetForm();
      },
      error: () => this.handleError('Failed to create patient'),
    });
  }

  private updatePatient(patient: Omit<Patient, 'id'>) {
    this.patientService.updatePatient(this.editedPatient!, patient).subscribe({
      next: () => {
        this.handleSuccess('Patient updated successfully');
        this.resetForm();
      },
      error: () => this.handleError('Failed to update patient'),
    });
  }

  deletePatient(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this patient?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.patientService.deletePatient(patient.id).subscribe({
          next: () => this.handleSuccess('Patient deleted successfully'),
          error: () => this.handleError('Failed to delete patient'),
        });
      }
    });
  }

  loadPatient(patient: Patient) {
    this.editedPatient = patient.id;
    this.formPatient.patchValue(patient);
  }

  viewDoctors() {
    const route = ['/doctors'];
    this.router.navigate(route);
  }

  private resetForm() {
    this.formPatient.reset();
    this.editedPatient = null;
    this.formPatient.markAsUntouched();
  }

  private handleSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.loadPatients();
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
    this.isLoading = false;
  }

  openAssignDoctorDialog(patient: Patient) {
    const dialogRef = this.dialog.open(AssignDoctorDialogComponent, {
      width: '400px',
      data: { patientId: patient.id },
    });

    dialogRef.afterClosed().subscribe((doctorId: number | undefined) => {
      if (doctorId) {
        this.assignDoctor(patient.id, doctorId);
      }
    });
  }

  assignDoctor(patientId: number, doctorId: number) {
    this.patientService.assignDoctor(patientId, doctorId).subscribe({
      next: () => {
        this.handleSuccess('Doctor assigned successfully');
        this.loadPatients();
      },
      error: () => this.handleError('Failed to assign doctor'),
    });
  }

  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }
}
