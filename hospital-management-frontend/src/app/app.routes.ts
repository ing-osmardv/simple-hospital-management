import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doctors/:id/patients', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorListComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/doctors' },
];