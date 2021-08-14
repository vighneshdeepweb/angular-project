import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfilterComponent } from './userfilter.component';

describe('UserfilterComponent', () => {
  let component: UserfilterComponent;
  let fixture: ComponentFixture<UserfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
