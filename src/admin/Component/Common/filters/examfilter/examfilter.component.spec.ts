import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamfilterComponent } from './examfilter.component';

describe('ExamfilterComponent', () => {
  let component: ExamfilterComponent;
  let fixture: ComponentFixture<ExamfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
