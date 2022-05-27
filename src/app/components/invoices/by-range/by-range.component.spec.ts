import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRangeComponent } from './by-range.component';

describe('ByRangeComponent', () => {
  let component: ByRangeComponent;
  let fixture: ComponentFixture<ByRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
