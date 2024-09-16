import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iModalita } from '../../i-modalita';
import { ModalitaService } from '../../modalita.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modalita-create',
  templateUrl: './modalita-create.component.html'
})
export class ModalitaCreateComponent {
  // Definiamo il form per l'inserimento dei dati
  modalitaForm: FormGroup;

  constructor(
    private modalitaService: ModalitaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inizializziamo il form con i controlli e le validazioni
    this.modalitaForm = this.fb.group({
      tipoModalita: ['', Validators.required] // Il tipoModalita è obbligatorio
    });
  }

  // Metodo per gestire la creazione della nuova modalità
  addModalita(): void {
    if (this.modalitaForm.valid) {
      const newModalita: iModalita = {
        iD_Modalita: 0, // L'ID sarà generato automaticamente dal backend
        tipoModalita: this.modalitaForm.get('tipoModalita')?.value // Prendi il valore dal form
      };

      // Chiama il servizio per aggiungere la nuova modalità
      this.modalitaService.addModalita(newModalita).subscribe(() => {
        // Naviga alla lista delle modalità dopo il successo
        this.router.navigate(['/modalita/list']);
      });
    }
  }
}
