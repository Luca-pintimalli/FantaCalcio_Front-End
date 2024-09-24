import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAstaComponent } from './gestione-asta.component';

describe('GestioneAstaComponent', () => {
  let component: GestioneAstaComponent;
  let fixture: ComponentFixture<GestioneAstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneAstaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneAstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
