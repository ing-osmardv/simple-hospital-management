import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doctors/:id/patients', component: PatientListComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'patients', component: PatientListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
