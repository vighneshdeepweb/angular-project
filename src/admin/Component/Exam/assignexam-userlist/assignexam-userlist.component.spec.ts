import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignexamUserlistComponent } from './assignexam-userlist.component';

describe('AssignexamUserlistComponent', () => {
  let component: AssignexamUserlistComponent;
  let fixture: ComponentFixture<AssignexamUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignexamUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignexamUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
