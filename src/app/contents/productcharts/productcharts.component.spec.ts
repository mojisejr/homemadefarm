import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductchartsComponent } from './productcharts.component';

describe('ProductchartsComponent', () => {
  let component: ProductchartsComponent;
  let fixture: ComponentFixture<ProductchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
