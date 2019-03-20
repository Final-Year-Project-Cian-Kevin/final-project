import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoHeaderComponent } from './logo-header.component';

describe('LogoHeaderComponent', () => {
  let component: LogoHeaderComponent;
  let fixture: ComponentFixture<LogoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
