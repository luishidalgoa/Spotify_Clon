import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListMinCardComponent } from './min-card.component';
import { CapitalizeFirstPipe } from '../../../Pipes/capitalize-first.pipe';

describe('PlayListMinCardComponent', () => {
  let component: PlayListMinCardComponent;
  let fixture: ComponentFixture<PlayListMinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListMinCardComponent,CapitalizeFirstPipe]
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
