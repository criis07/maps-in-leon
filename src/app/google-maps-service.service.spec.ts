import { TestBed } from '@angular/core/testing';

import { GoogleMapsService } from './google-maps-service.service';

describe('GoogleMapsServiceService', () => {
  let service: GoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
