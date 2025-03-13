import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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

import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ConfirmationDialogComponent,
    MatDialogModule,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  private doctorService = inject(DoctorService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  doctors: Doctor[] = [];
  displayedColumns: string[] = ['name', 'specialty', 'actions'];
  editedDoctor: number | null = null;
  isLoading = true;

  formDoctor = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    specialty: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit() {
    this.loadDoctors();
  }

  private loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.isLoading = false;
      },
      error: () => this.handleError('Failed to load doctors'),
    });
  }

  submitForm() {
    if (this.formDoctor.invalid) {
      this.formDoctor.markAllAsTouched();
      return;
    }

    const doctorData = this.getFormData();

    if (this.editedDoctor) {
      this.updateDoctor(doctorData);
    } else {
      this.createDoctor(doctorData);
    }
  }

  private getFormData(): Omit<Doctor, 'id'> {
    return {
      name: this.formDoctor.value.name!.trim(),
      specialty: this.formDoctor.value.specialty!.trim(),
    };
  }

  private createDoctor(doctor: Omit<Doctor, 'id'>) {
    this.doctorService.createDoctor(doctor).subscribe({
      next: () => {
        this.handleSuccess('Doctor created successfully');
        this.resetForm();
      },
      error: () => this.handleError('Failed to create doctor'),
    });
  }

  private updateDoctor(doctor: Omit<Doctor, 'id'>) {
    this.doctorService.updateDoctor(this.editedDoctor!, doctor).subscribe({
      next: () => {
        this.handleSuccess('Doctor updated successfully');
        this.resetForm();
      },
      error: () => this.handleError('Failed to update doctor'),
    });
  }

  deleteDoctor(doctor: Doctor) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this doctor?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.doctorService.deleteDoctor(doctor.id).subscribe({
          next: () => this.handleSuccess('Doctor deleted successfully'),
          error: () => this.handleError('Failed to delete doctor'),
        });
      }
    });
  }

  loadDoctor(doctor: Doctor) {
    this.editedDoctor = doctor.id;
    this.formDoctor.patchValue(doctor);
  }

  viewPatients(doctorId?: number) {
    const route = doctorId ? ['/doctors', doctorId, 'patients'] : ['/patients'];
    this.router.navigate(route);
  }

  private resetForm() {
    this.formDoctor.reset();
    this.editedDoctor = null;
    this.formDoctor.markAsUntouched();
  }

  private handleSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.loadDoctors();
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
    this.isLoading = false;
  }

  trackByDoctorId(index: number, doctor: Doctor): number {
    return doctor.id;
  }
}
