import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRedditComponent } from './post-reddit.component';

describe('PostRedditComponent', () => {
  let component: PostRedditComponent;
  let fixture: ComponentFixture<PostRedditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRedditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRedditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
