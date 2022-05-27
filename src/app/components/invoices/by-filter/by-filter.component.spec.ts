import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByFilterComponent } from './by-filter.component';

describe('ByFilterComponent', () => {
  let component: ByFilterComponent;
  let fixture: ComponentFixture<ByFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
