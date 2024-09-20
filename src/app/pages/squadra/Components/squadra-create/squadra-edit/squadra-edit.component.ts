import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iSquadra } from '../../../i-squadra';
import { SquadraService } from '../../../squadra.service';

@Component({
  selector: 'app-squadra-edit',
  templateUrl: './squadra-edit.component.html',
  styleUrls: ['./squadra-edit.component.scss']
})
export class SquadraEditComponent implements OnInit {
  squadraForm!: FormGroup;  // Form per la modifica della squadra
  id!: number;  // ID della squadra da modificare
  errorMessage: string = '';  // Messaggi di errore
  squadra!: iSquadra;  // Dati della squadra
  selectedFile: File | null = null;  // File della foto selezionato
  previewUrl: string | ArrayBuffer | null = null;  // Anteprima immagine

  constructor(
    private fb: FormBuilder,
    private squadraService: SquadraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID dalla route
    this.id = +this.route.snapshot.paramMap.get('id')!;
    
    // Ottieni i dati della squadra da modificare
    this.squadraService.getSquadraById(this.id).subscribe({
      next: (data) => {
        this.squadra = data;
        this.populateForm();
      },
      error: (err) => {
        this.errorMessage = 'Errore nel caricamento della squadra';
      }
    });

    // Inizializza il form, aggiungendo il campo creditiSpesi
    this.squadraForm = this.fb.group({
      nome: ['', Validators.required],
      creditiTotali: [0, Validators.required],
      creditiSpesi: [0, Validators.required],  // Aggiungi questo campo
    });
}

populateForm(): void {
    this.squadraForm.patchValue({
      nome: this.squadra.nome,
      creditiTotali: this.squadra.creditiTotali,
      creditiSpesi: this.squadra.creditiSpesi  // Popola anche i crediti spesi
    });
}


  // Gestisci la selezione del file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Anteprima dell'immagine selezionata
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;  // Salva l'anteprima
      };
      reader.readAsDataURL(file);
    }
  }

  // Aggiorna la squadra
  updateSquadra(): void {
    const formData = new FormData();
    formData.append('nome', this.squadraForm.get('nome')?.value);
    formData.append('creditiTotali', this.squadraForm.get('creditiTotali')?.value);
    formData.append('creditiSpesi', this.squadraForm.get('creditiSpesi')?.value);  // Includi i crediti spesi

    if (this.selectedFile) {
      formData.append('stemma', this.selectedFile, this.selectedFile.name);
    }
  
    this.squadraService.updateSquadra(this.id, formData).subscribe({
      next: () => {
        this.router.navigate(['/Squadra']);
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento della squadra', err);
      }
    });
}

  
  
  // Metodo per annullare e tornare alla pagina precedente
  cancel(): void {
    this.router.navigate(['/Squadra']);
  }
}
