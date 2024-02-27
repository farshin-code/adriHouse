import { TestBed } from '@angular/core/testing';

import { NewListingService } from './new-listing.service';

describe('NewListingService', () => {
  let service: NewListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
