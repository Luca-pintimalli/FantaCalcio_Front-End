import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';

@Component({
  selector: 'app-giocatori-create',
  templateUrl: './giocatori-create.component.html',
  styleUrls: ['./giocatori-create.component.scss']
})
export class GiocatoriCreateComponent implements OnInit {
  giocatoreForm: FormGroup = this.fb.group({}); // Inizializzazione nel costruttore
  errore: string | null = null;
  loading: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  ruoliClassic: string[] = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'];

  constructor(
    private fb: FormBuilder,
    private giocatoriService: GiocatoriService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.giocatoreForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      squadraAttuale: ['', Validators.required],
      goalFatti: [0],
      goalSubiti: [0],
      assist: [0],
      partiteGiocate: [0],
      ruoloClassic: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Genera l'anteprima dell'immagine
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;  // Salva l'anteprima da mostrare
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    
    formData.append('Nome', this.giocatoreForm.get('nome')?.value ?? '');
    formData.append('Cognome', this.giocatoreForm.get('cognome')?.value ?? '');
    formData.append('SquadraAttuale', this.giocatoreForm.get('squadraAttuale')?.value ?? '');
    formData.append('GoalFatti', this.giocatoreForm.get('goalFatti')?.value ?? '0');
    formData.append('GoalSubiti', this.giocatoreForm.get('goalSubiti')?.value ?? '0');
    formData.append('Assist', this.giocatoreForm.get('assist')?.value ?? '0');
    formData.append('PartiteGiocate', this.giocatoreForm.get('partiteGiocate')?.value ?? '0');
    formData.append('RuoloClassic', this.giocatoreForm.get('ruoloClassic')?.value ?? '');
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
  
    // Log per vedere cosa viene inviato
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.giocatoriService.addGiocatoreWithImage(formData).subscribe({
      next: () => {
        this.router.navigate(['/giocatori']);
      },
      error: (err) => {
        console.error('Errore durante la creazione del giocatore:', err);
        this.errore = 'Errore durante la creazione del giocatore';
      }
    });
  }
  

  // Metodo per tornare alla lista dei giocatori
  goBack(): void {
    this.router.navigate(['/giocatori']);
  }
}
