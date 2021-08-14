import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamscreenComponent } from './examscreen.component';

describe('ExamscreenComponent', () => {
  let component: ExamscreenComponent;
  let fixture: ComponentFixture<ExamscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
