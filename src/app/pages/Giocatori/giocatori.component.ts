import { Component, OnInit } from '@angular/core';
import { iGiocatore } from './i-giocatore';
import { Router } from '@angular/router';
import { GiocatoriService } from './giocatori.service';

@Component({
  selector: 'app-giocatore',
  templateUrl: './giocatori.component.html',
  styleUrls: ['./giocatori.component.scss']
})
export class GiocatoreComponent implements OnInit {
  giocatoreList: iGiocatore[] = [];  // La proprietà è correttamente nominata
  errore: string | null = null;  // Per la gestione degli errori

  constructor(private giocatoreService: GiocatoriService, private router: Router) {}

  ngOnInit(): void {
    this.loadGiocatori();
  }

  // Carica la lista dei giocatori dal servizio
  loadGiocatori(): void {
    this.giocatoreService.getAllGiocatori().subscribe(data => {
      this.giocatoreList = data;
    });
  }

  // Naviga alla pagina di modifica per un giocatore
  editGiocatore(id: number): void {
    this.router.navigate(['/giocatori/edit', id]);
  }

  // Elimina un giocatore con conferma
  deleteGiocatore(iD_Giocatore: number | undefined): void {
    if (!iD_Giocatore) {
      this.errore = 'ID giocatore non valido';
      return;
    }

    if (confirm('Sei sicuro di voler eliminare questo giocatore?')) {
      this.giocatoreService.deleteGiocatore(iD_Giocatore).subscribe({
        next: () => {
          this.loadGiocatori();  // Ricarica la lista dopo l'eliminazione
        },
        error: (err) => {
          this.errore = 'Errore durante l\'eliminazione del giocatore';
        }
      });
    }
  }

  // Metodo per navigare alla pagina di creazione di un nuovo giocatore
  createGiocatore(): void {
    this.router.navigate(['/giocatori/create']);
  }

  // Naviga alla pagina di gestione dei ruoli Mantra per il giocatore
  associateRuoloMantra(idGiocatore: number) {
    console.log('ID Giocatore:', idGiocatore);  // Aggiungi un log per verificare l'ID
    this.router.navigate(['/ruolo-mantra', idGiocatore]);  // Naviga verso la route con l'ID
  }
}
