import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoAstaService } from '../../tipo-asta.service';

@Component({
  selector: 'app-tipo-asta-create',
  templateUrl: './tipo-asta-create.component.html'
})
export class TipoAstaCreateComponent {
  tipoAstaForm: FormGroup;

  constructor(
    private tipoAstaService: TipoAstaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inizializzazione del form
    this.tipoAstaForm = this.fb.group({
      nomeTipoAsta: ['', Validators.required]  // Nome del tipo di asta è obbligatorio
    });
  }

  // Metodo per aggiungere un nuovo tipo di asta
  addTipoAsta(): void {
    if (this.tipoAstaForm.valid) {
      const newTipoAsta = {
        iD_TipoAsta: 0,  // L'ID verrà generato dal backend
        nomeTipoAsta: this.tipoAstaForm.get('nomeTipoAsta')?.value
      };

      // Chiamata al servizio per aggiungere un nuovo tipo di asta
      this.tipoAstaService.addTipoAsta(newTipoAsta).subscribe(() => {
        this.router.navigate(['/TipoAsta']);  // Naviga alla lista dei tipi di asta dopo la creazione
      });
    }
  }
}
