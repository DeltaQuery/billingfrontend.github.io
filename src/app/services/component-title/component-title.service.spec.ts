import { TestBed } from '@angular/core/testing';

import { ComponentTitleService } from './component-title.service';

describe('ComponentTitleService', () => {
  let service: ComponentTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
