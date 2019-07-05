import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDstvCodeComponent } from './verify-dstv-code.component';

describe('VerifyDstvCodeComponent', () => {
  let component: VerifyDstvCodeComponent;
  let fixture: ComponentFixture<VerifyDstvCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDstvCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDstvCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
