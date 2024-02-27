import { TestBed } from '@angular/core/testing';

import { GloginService } from './glogin.service';

describe('GloginService', () => {
  let service: GloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
