import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalitaService } from '../../modalita.service';

@Component({
  selector: 'app-modalita-create',
  templateUrl: './modalita-create.component.html'
})
export class ModalitaCreateComponent {
  modalitaForm: FormGroup;

  constructor(
    private modalitaService: ModalitaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.modalitaForm = this.fb.group({
      tipoModalita: ['', Validators.required]
    });
  }

  addModalita(): void {
    if (this.modalitaForm.valid) {
      const newModalita = {
        iD_Modalita: 0,
        tipoModalita: this.modalitaForm.get('tipoModalita')?.value
      };

      this.modalitaService.addModalita(newModalita).subscribe(() => {
        this.router.navigate(['/modalita']);  // Torna alla lista dopo la creazione
      });
    }
  }
}
