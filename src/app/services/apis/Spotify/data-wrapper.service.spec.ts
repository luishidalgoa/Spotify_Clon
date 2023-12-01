import { TestBed } from '@angular/core/testing';

import { DataWrapperService } from './data-wrapper.service';

describe('DataWrapperService', () => {
  let service: DataWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
