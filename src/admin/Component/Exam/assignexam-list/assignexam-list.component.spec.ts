import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignexamListComponent } from './assignexam-list.component';

describe('AssignexamListComponent', () => {
  let component: AssignexamListComponent;
  let fixture: ComponentFixture<AssignexamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignexamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignexamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
