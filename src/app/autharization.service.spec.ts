import { TestBed } from '@angular/core/testing';

import { AutharizationService } from './autharization.service';

describe('AutharizationService', () => {
  let service: AutharizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutharizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
