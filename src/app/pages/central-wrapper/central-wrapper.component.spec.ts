import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralWrapperComponent } from './central-wrapper.component';

describe('CentralWrapperComponent', () => {
  let component: CentralWrapperComponent;
  let fixture: ComponentFixture<CentralWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
