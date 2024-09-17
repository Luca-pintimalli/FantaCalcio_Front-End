import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iGiocatore } from '../../i-giocatore';
import { iRuoloMantra } from '../../../Ruoli/ruoloMantra/i-ruolo-mantra';
import { GiocatoriService } from '../../giocatori.service';
import { RuoliMantraService } from '../../../Ruoli/ruoloMantra/ruoli-mantra.service';

@Component({
  selector: 'app-giocatori-edit',
  templateUrl: './giocatori-edit.component.html',
  styleUrls: ['./giocatori-edit.component.scss']
})
export class GiocatoriEditComponent implements OnInit {
  giocatore: iGiocatore | undefined;
  errore: string | null = null;
  availableRuoliMantra: iRuoloMantra[] = [];  // Lista di ruoli Mantra disponibili

  constructor(
    private giocatoreService: GiocatoriService,
    private route: ActivatedRoute,
    private router: Router,
    private ruoliMantraService: RuoliMantraService  // Aggiungi il servizio RuoliMantra
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.giocatoreService.getGiocatoreById(id).subscribe({
      next: (data) => {
        this.giocatore = data;
      },
      error: (err) => {
        this.errore = 'Errore durante il caricamento del giocatore';
        console.error(err);
      }
    });

    // Carica i ruoli Mantra disponibili
    this.loadRuoliMantra();
  }

  // Metodo per caricare i ruoli Mantra
  loadRuoliMantra(): void {
    this.ruoliMantraService.getRuoliMantra().subscribe({
      next: (data) => {
        this.availableRuoliMantra = data;  // Assegna i ruoli Mantra disponibili
      },
      error: (err) => {
        console.error('Errore nel caricamento dei ruoli Mantra', err);
      }
    });
  }

  // Metodo per aggiornare il giocatore
  updateGiocatore(): void {
    if (this.giocatore) {
      this.giocatoreService.updateGiocatore(this.giocatore.iD_Giocatore, this.giocatore).subscribe({
        next: () => {
          console.log('Giocatore aggiornato con successo');
          this.router.navigate(['/giocatori']);
        },
        error: (err) => {
          this.errore = 'Errore durante l\'aggiornamento del giocatore';
          console.error(err);
        }
      });
    }
  }
}
