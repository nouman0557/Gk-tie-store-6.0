import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiesComponent } from './ties.component';

describe('TiesComponent', () => {
  let component: TiesComponent;
  let fixture: ComponentFixture<TiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
