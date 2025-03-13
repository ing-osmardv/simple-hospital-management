import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'

import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  addDoctor(){
    this.router.navigate(['/doctors/form']);
  }

  viewPatients(doctorId: number | null = null) {
    if(doctorId){
      this.router.navigate(['/doctors', doctorId, 'patients']);
    }else{
      this.router.navigate(['/patients']);
    }
  }
}
