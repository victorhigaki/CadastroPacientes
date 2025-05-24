import { TestBed } from '@angular/core/testing';

import { ConveniosService } from './convenios.service';

describe('ConvenioService', () => {
  let service: ConveniosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConveniosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
