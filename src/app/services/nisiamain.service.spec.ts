import { TestBed } from '@angular/core/testing';

import { NisiamainService } from './nisiamain.service';

describe('NisiamainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NisiamainService = TestBed.get(NisiamainService);
    expect(service).toBeTruthy();
  });
});
