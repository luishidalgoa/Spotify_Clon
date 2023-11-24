import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secondAuthGuard } from './second-auth.guard';

describe('secondAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => secondAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
