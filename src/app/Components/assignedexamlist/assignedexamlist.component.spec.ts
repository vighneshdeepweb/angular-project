import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedexamlistComponent } from './assignedexamlist.component';

describe('AssignedexamlistComponent', () => {
  let component: AssignedexamlistComponent;
  let fixture: ComponentFixture<AssignedexamlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedexamlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedexamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
