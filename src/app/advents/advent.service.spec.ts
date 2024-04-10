import { TestBed } from '@angular/core/testing';

import { AdventService } from './advent.service';

describe('AdventService', () => {
  let service: AdventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
