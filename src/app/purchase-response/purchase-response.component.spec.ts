import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseResponseComponent } from './purchase-response.component';

describe('PurchaseResponseComponent', () => {
  let component: PurchaseResponseComponent;
  let fixture: ComponentFixture<PurchaseResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
