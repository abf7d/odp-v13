import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedPointInfoComponent} from './selected-point-info.component';

describe('SelectedPointInfoComponent', () => {
  let component: SelectedPointInfoComponent;
  let fixture: ComponentFixture<SelectedPointInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPointInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedPointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
