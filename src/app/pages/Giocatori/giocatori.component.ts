import { Component, OnInit } from '@angular/core';
import { GiocatoriService } from './giocatori.service';
import { iGiocatore } from './i-giocatore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giocatore',
  templateUrl: './giocatori.component.html',
  styleUrls: ['./giocatori.component.scss']
})
export class GiocatoreComponent implements OnInit {
  giocatoreList: iGiocatore[] = [];  // Lista dei giocatori
  errore: string | null = null;  // Per gestire gli errori

  constructor(private giocatoriService: GiocatoriService, private router: Router) {}

  ngOnInit(): void {
    this.loadGiocatori();
  }

  // Metodo per caricare i giocatori
  loadGiocatori(): void {
    this.giocatoriService.getAllGiocatori().subscribe({
      next: (data) => this.giocatoreList = data,
      error: (err) => {
        console.error('Errore nel caricamento dei giocatori', err);
        this.errore = 'Errore nel caricamento dei giocatori';  // Imposta il messaggio di errore
      }
    });
  }

  // Metodo per navigare alla pagina di modifica di un giocatore
  editGiocatore(id: number): void {
    this.router.navigate(['/giocatori/edit', id]);
  }

  // Metodo per eliminare un giocatore
  deleteGiocatore(iD_Giocatore: number): void {
    if (confirm('Sei sicuro di voler eliminare questo giocatore?')) {
      this.giocatoriService.deleteGiocatore(iD_Giocatore).subscribe({
        next: () => {
          console.log('Giocatore eliminato correttamente');
          this.loadGiocatori();  // Ricarica la lista dopo l'eliminazione
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione del giocatore', err);
          this.errore = 'Errore durante l\'eliminazione del giocatore';  // Imposta il messaggio di errore
        }
      });
    }
  }

  // Metodo per navigare alla pagina di creazione di un nuovo giocatore
  createGiocatore(): void {
    this.router.navigate(['/giocatori/create']);
  }
}
