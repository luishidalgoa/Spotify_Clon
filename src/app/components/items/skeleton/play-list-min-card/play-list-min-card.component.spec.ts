import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListMinCardComponent } from './play-list-min-card.component';

describe('PlayListMinCardComponent', () => {
  let component: PlayListMinCardComponent;
  let fixture: ComponentFixture<PlayListMinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListMinCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayListMinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
