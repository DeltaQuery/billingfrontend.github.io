import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvencyReportComponent } from './solvency-report.component';

describe('SolvencyReportComponent', () => {
  let component: SolvencyReportComponent;
  let fixture: ComponentFixture<SolvencyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvencyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvencyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
