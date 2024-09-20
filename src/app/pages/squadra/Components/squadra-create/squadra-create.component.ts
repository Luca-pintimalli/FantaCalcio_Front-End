import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SquadraService } from '../../squadra.service';

@Component({
  selector: 'app-squadra-create',
  templateUrl: './squadra-create.component.html',
  styleUrls: ['./squadra-create.component.scss']
})
export class SquadraCreateComponent implements OnInit {
  squadraForm: FormGroup = this.fb.group({}); // Inizializzazione nel costruttore
  errore: string | null = null;
  loading: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private squadraService: SquadraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.squadraForm = this.fb.group({
      nome: ['', Validators.required],  // Solo il campo "nome" è nel form
      foto: [null]
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

    formData.append('Nome', this.squadraForm.get('nome')?.value ?? ''); // Nome della squadra
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); // Foto della squadra
    }

    // Per i campi non presenti nel form, mettiamo dei placeholder o valori di default.
    formData.append('ID_Asta', '0'); // Placeholder per ID Asta
    formData.append('CreditiTotali', '0'); // Placeholder per i crediti totali
    formData.append('CreditiSpesi', '0'); // Placeholder per i crediti spesi
    formData.append('GiocatoriIds', '[]'); // Placeholder per la lista dei giocatori
    formData.append('OperazioniIds', '[]'); // Placeholder per la lista delle operazioni

    this.squadraService.addSquadraWithImage(formData).subscribe({
      next: () => {
        this.router.navigate(['/squadre']); // Reindirizza alla lista delle squadre
      },
      error: (err) => {
        console.error('Errore durante la creazione della squadra:', err);
        this.errore = 'Errore durante la creazione della squadra';
      }
    });
  }

  // Metodo per tornare alla lista delle squadre
  goBack(): void {
    this.router.navigate(['/squadre']);
  }
}
