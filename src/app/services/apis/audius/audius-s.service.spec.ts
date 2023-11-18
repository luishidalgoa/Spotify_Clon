import { TestBed } from '@angular/core/testing';

import { AudiusSService } from './audius-s.service';

describe('AudiusSService', () => {
  let service: AudiusSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudiusSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
