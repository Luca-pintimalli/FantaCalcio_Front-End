import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuoloMantraComponent } from './ruolo-mantra.component';

describe('RuoloMantraComponent', () => {
  let component: RuoloMantraComponent;
  let fixture: ComponentFixture<RuoloMantraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuoloMantraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuoloMantraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
