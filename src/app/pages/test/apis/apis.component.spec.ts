import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisComponent } from './apis.component';

describe('ApisComponent', () => {
  let component: ApisComponent;
  let fixture: ComponentFixture<ApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
