import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDoctorDialogComponent } from './assign-doctor-dialog.component';

describe('AssignDoctorDialogComponent', () => {
  let component: AssignDoctorDialogComponent;
  let fixture: ComponentFixture<AssignDoctorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDoctorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
