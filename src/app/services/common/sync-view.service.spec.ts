import { TestBed } from '@angular/core/testing';

import { SyncViewService } from './sync-view.service';

describe('SyncViewService', () => {
  let service: SyncViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
