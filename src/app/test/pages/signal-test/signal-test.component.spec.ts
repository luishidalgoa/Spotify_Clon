import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTestComponent } from './signal-test.component';

describe('SignalTestComponent', () => {
  let component: SignalTestComponent;
  let fixture: ComponentFixture<SignalTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
