import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptedExamComponent } from './attempted-exam.component';

describe('AttemptedExamComponent', () => {
  let component: AttemptedExamComponent;
  let fixture: ComponentFixture<AttemptedExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptedExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptedExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
