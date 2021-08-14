import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { AssignexamUserlistComponent } from '../../../../admin/Component/Exam/assignexam-userlist/assignexam-userlist.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  let listComponent: AssignexamUserlistComponent;
  let fix: ComponentFixture<AssignexamUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent, AssignexamUserlistComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    fix = TestBed.createComponent(AssignexamUserlistComponent);
    component = fixture.componentInstance;
    listComponent = fix.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(listComponent).toBeTruthy();
  });
});
