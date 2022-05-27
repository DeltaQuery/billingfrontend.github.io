import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInvoiceButtonComponent } from './print-invoice-button.component';

describe('PrintInvoiceButtonComponent', () => {
  let component: PrintInvoiceButtonComponent;
  let fixture: ComponentFixture<PrintInvoiceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInvoiceButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInvoiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
