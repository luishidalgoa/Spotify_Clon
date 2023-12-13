import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatListBigCardComponent } from './plat-list-big-card.component';

describe('PlatListBigCardComponent', () => {
  let component: PlatListBigCardComponent;
  let fixture: ComponentFixture<PlatListBigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatListBigCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatListBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
