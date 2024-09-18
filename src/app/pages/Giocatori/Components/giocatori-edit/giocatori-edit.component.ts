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
  giocatore: iGiocatore | null = null;  // Inizializzato come null finché non carichiamo i dati
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.giocatore!.foto = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.giocatore!.foto = null;  // Assicurati che "foto" possa accettare "null"
    }
  }
  
  
  onSubmit(): void {
    if (this.giocatore) {
      // Assicuriamoci che foto sia una stringa vuota se è null o undefined
      this.giocatore.foto = this.giocatore.foto ?? ''; 
      
      console.log('Dati inviati per l\'aggiornamento:', this.giocatore);  // Log dei dati inviati
      this.giocatoriService.updateGiocatore(this.giocatore.iD_Giocatore, this.giocatore).subscribe({
        next: () => {
          this.router.navigate(['/giocatori']);
        },
        error: (err) => {
          this.errore = 'Errore durante l\'aggiornamento del giocatore';
          console.error(err);
        }
      });
    }
  }
  
  
  
  
  
  // Metodo per tornare alla lista dei giocatori
  goBack(): void {
    this.router.navigate(['/giocatori']);
  }
}
