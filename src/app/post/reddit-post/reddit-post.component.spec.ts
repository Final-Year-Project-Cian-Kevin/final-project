import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditPostComponent } from './reddit-post.component';

describe('RedditPostComponent', () => {
  let component: RedditPostComponent;
  let fixture: ComponentFixture<RedditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
