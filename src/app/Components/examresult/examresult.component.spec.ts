import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamresultComponent } from './examresult.component';

describe('ExamresultComponent', () => {
  let component: ExamresultComponent;
  let fixture: ComponentFixture<ExamresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
