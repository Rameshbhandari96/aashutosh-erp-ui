import { TestBed } from '@angular/core/testing';

import { HttpClientHelperService } from './http-client-helper.service';

describe('MasterServiceService', () => {
  let service: HttpClientHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
