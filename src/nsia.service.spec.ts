import { TestBed } from '@angular/core/testing';

import { NsiaService } from './nsia.service';

describe('NsiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NsiaService = TestBed.get(NsiaService);
    expect(service).toBeTruthy();
  });
});
