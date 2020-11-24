import { TestBed } from '@angular/core/testing';

import { PopularSearchService } from './popular-search.service';

describe('PopularSearchService', () => {
  let service: PopularSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
