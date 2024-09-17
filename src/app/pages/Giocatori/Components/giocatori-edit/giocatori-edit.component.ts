import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iGiocatore } from '../../i-giocatore';
import { RuoloMantraService } from '../../../Ruoli/ruoloMantra/ruoli-mantra.service'; // Correggi il percorso se necessario
import { GiocatoriService } from '../../giocatori.service'; // Servizio per i giocatori

@Component({
  selector: 'app-giocatori-edit',
  templateUrl: './giocatori-edit.component.html',
  styleUrls: ['./giocatori-edit.component.scss']
})
export class GiocatoriEditComponent implements OnInit {
  giocatore: iGiocatore | undefined;
  errore: string | null = null;
  availableRuoliMantra: any[] = [];  // Lista di ruoli Mantra disponibili

  constructor(
    private giocatoreService: GiocatoriService,
    private ruoloMantraService: RuoloMantraService,
    private route: ActivatedRoute,
    private router: Router
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

    // Carica i ruoli Mantra
    this.loadRuoliMantra();
  }

  // Metodo per caricare i ruoli Mantra
  loadRuoliMantra(): void {
    this.ruoloMantraService.getRuoliMantra().subscribe({
      next: (data) => {
        this.availableRuoliMantra = data;
      },
      error: (err) => {
        this.errore = 'Errore durante il caricamento dei ruoli Mantra';
        console.error(err);
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
