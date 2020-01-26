import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveOrderComponent } from './reserve-order.component';

describe('ReserveOrderComponent', () => {
  let component: ReserveOrderComponent;
  let fixture: ComponentFixture<ReserveOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
