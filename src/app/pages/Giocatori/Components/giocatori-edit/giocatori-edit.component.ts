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
  selectedFile: File | null = null;  // Aggiunta di selectedFile

  // Ruoli Classic 
  ruoliClassic: string[] = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'];

  constructor(
    private giocatoriService: GiocatoriService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Metodo ngOnInit che viene chiamato quando il componente è inizializzato
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.caricaGiocatore(id);  // Chiamata al metodo caricaGiocatore
    } else {
      this.errore = 'ID giocatore non valido';
    }
  }

  // Metodo per caricare i dettagli del giocatore
  caricaGiocatore(id: number): void {
    this.giocatoriService.getGiocatoreById(id).subscribe({
      next: (data: iGiocatore) => {
        this.giocatore = data;
  
        // Aggiungi l'URL base del backend per caricare correttamente l'immagine
        if (this.giocatore.foto && this.giocatore.foto !== 'Nessuna foto disponibile') {
          this.giocatore.foto = `https://localhost:7260${this.giocatore.foto}`;
        }
  
        console.log('Giocatore caricato:', this.giocatore);
      },
      error: (err) => {
        this.errore = 'Errore nel caricamento del giocatore';
        console.error('Errore nel caricamento del giocatore:', err);
      }
    });
  }

  // Metodo per gestire la selezione del file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Assegna il file selezionato alla proprietà selectedFile

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.giocatore!.foto = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.giocatore!.foto = null;  // Imposta null se nessun file è selezionato
    }
  }

  // Metodo per inviare i dati del giocatore aggiornato
  onSubmit(): void {
    if (this.giocatore) {
      const formData = new FormData();
  
      formData.append('Nome', this.giocatore.nome);
      formData.append('Cognome', this.giocatore.cognome);
      formData.append('SquadraAttuale', this.giocatore.squadraAttuale);
      formData.append('GoalFatti', this.giocatore.goalFatti.toString());
      formData.append('GoalSubiti', this.giocatore.goalSubiti.toString());
      formData.append('Assist', this.giocatore.assist.toString());
      formData.append('PartiteGiocate', this.giocatore.partiteGiocate.toString());
      formData.append('RuoloClassic', this.giocatore.ruoloClassic);
  
      if (this.selectedFile) {
        formData.append('File', this.selectedFile, this.selectedFile.name);
      }
  
      // Log del contenuto del FormData per il debug
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      this.giocatoriService.updateGiocatoreWithImage(this.giocatore.iD_Giocatore, formData).subscribe({
        next: () => {
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
