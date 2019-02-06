import { TestBed, inject } from '@angular/core/testing';

import { RedditApiService } from './reddit-api.service';

describe('RedditApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedditApiService]
    });
  });

  it('should be created', inject([RedditApiService], (service: RedditApiService) => {
    expect(service).toBeTruthy();
  }));
});
