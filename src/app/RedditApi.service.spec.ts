import { TestBed, inject } from '@angular/core/testing';

import { RedditApiService } from './RedditApi.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedditApiService]
    });
  });

  it('should be created', inject([RedditApiService], (service: RedditApiService) => {
    expect(service).toBeTruthy();
  }));
});
