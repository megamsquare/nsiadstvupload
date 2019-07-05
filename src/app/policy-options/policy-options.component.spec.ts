import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyOptionsComponent } from './policy-options.component';

describe('PolicyOptionsComponent', () => {
  let component: PolicyOptionsComponent;
  let fixture: ComponentFixture<PolicyOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
