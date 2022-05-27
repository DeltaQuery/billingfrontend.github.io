import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingNoticeComponent } from './billing-notice.component';

describe('BillingNoticeComponent', () => {
  let component: BillingNoticeComponent;
  let fixture: ComponentFixture<BillingNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
