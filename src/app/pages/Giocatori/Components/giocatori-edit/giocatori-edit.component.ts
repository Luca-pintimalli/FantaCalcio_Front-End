import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';

@Component({
  selector: 'app-giocatori-edit',
  templateUrl: './giocatori-edit.component.html',
  styleUrls: ['./giocatori-edit.component.scss']
})
export class GiocatoriEditComponent implements OnInit {
  giocatore: iGiocatore = {
    iD_Giocatore: 0,
    nome: '',
    cognome: '',
    foto: '',
    squadraAttuale: '',
    goalFatti: 0,
    goalSubiti: 0,
    assist: 0,
    partiteGiocate: 0,
    ruoloClassic: ''
  }; // Inizializzazione dell'oggetto giocatore
  errore: string | null = null;  // Per la gestione degli errori

  // Ruoli Classic hardcoded
  ruoliClassic: string[] = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'];

  constructor(
    private giocatoriService: GiocatoriService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.caricaGiocatore(id);
    } else {
      this.errore = 'ID giocatore non valido';
    }
  }

  // Metodo per caricare i dettagli del giocatore
  caricaGiocatore(id: number): void {
    this.giocatoriService.getGiocatoreById(id).subscribe({
      next: (data: iGiocatore) => {
        this.giocatore = data;
        console.log('Giocatore caricato:', this.giocatore);
      },
      error: (err) => {
        this.errore = 'Errore nel caricamento del giocatore';
        console.error('Errore nel caricamento del giocatore:', err);
      }
    });
  }

  // Metodo per aggiornare il giocatore
  onSubmit(): void {
    if (this.giocatore) {
      const giocatorePayload = {
        nome: this.giocatore.nome,
        cognome: this.giocatore.cognome,
        foto: this.giocatore.foto || "", // Assicurati che il campo foto non sia null o undefined
        squadraAttuale: this.giocatore.squadraAttuale,
        goalFatti: this.giocatore.goalFatti,
        goalSubiti: this.giocatore.goalSubiti,
        assist: this.giocatore.assist,
        partiteGiocate: this.giocatore.partiteGiocate,
        ruoloClassic: this.giocatore.ruoloClassic
      };
  
      console.log('Dati inviati per l\'aggiornamento:', giocatorePayload); // Log per verificare il payload
  
      this.giocatoriService.updateGiocatore(this.giocatore.iD_Giocatore, giocatorePayload).subscribe({
        next: (res) => {
          console.log('Giocatore aggiornato con successo');
          this.router.navigate(['/giocatori']);
        },
        error: (err) => {
          this.errore = 'Errore durante l\'aggiornamento del giocatore';
          console.error('Errore durante l\'aggiornamento del giocatore:', err);
        }
      });
    }
  }
  

  // Metodo per tornare alla lista dei giocatori
  goBack(): void {
    this.router.navigate(['/giocatori']);
  }
}
