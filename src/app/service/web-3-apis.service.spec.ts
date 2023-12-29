import { TestBed } from '@angular/core/testing';

import { Web3ApisService } from './web-3-apis.service';

describe('Web3ApisService', () => {
  let service: Web3ApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3ApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
