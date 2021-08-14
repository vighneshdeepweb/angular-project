import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincontainerComponent } from './logincontainer.component';

describe('LogincontainerComponent', () => {
  let component: LogincontainerComponent;
  let fixture: ComponentFixture<LogincontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogincontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
