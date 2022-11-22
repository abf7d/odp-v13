import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedPointPanelComponent} from './selected-point-panel.component';

describe('SelectedPointPanelComponent', () => {
  let component: SelectedPointPanelComponent;
  let fixture: ComponentFixture<SelectedPointPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPointPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedPointPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
