import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RuoliService } from '../../ruoli.service';

@Component({
  selector: 'app-ruoli-create',
  templateUrl: './ruoli-create.component.html',
  styleUrls: ['./ruoli-create.component.scss'] // Nota che 'styleUrls' è il modo corretto
})
export class RuoliCreateComponent {
  ruoloForm: FormGroup;

  constructor(
    private ruoloService: RuoliService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inizializzazione del form
    this.ruoloForm = this.fb.group({
      nomeRuolo: ['', Validators.required],  // Nome del ruolo è obbligatorio
      iD_Modalita: ['', Validators.required] // ID della modalità è obbligatorio
    });
  }

  // Metodo per aggiungere un nuovo ruolo
  addRuolo(): void {
    if (this.ruoloForm.valid) {
      const newRuolo = {
        iD_Ruolo: 0,  // L'ID verrà generato dal backend
        nomeRuolo: this.ruoloForm.get('nomeRuolo')?.value,
        iD_Modalita: this.ruoloForm.get('iD_Modalita')?.value
      };

      // Chiamata al servizio per aggiungere un nuovo ruolo
      this.ruoloService.addRuolo(newRuolo).subscribe(() => {
        this.router.navigate(['/ruoli']);  // Naviga alla lista dei ruoli dopo la creazione
      });
    }
  }
}
