import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalitaService } from '../../modalita.service';
import { iModalita } from '../../i-modalita';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modalita-edit',
  templateUrl: './modalita-edit.component.html'
})
export class ModalitaEditComponent implements OnInit {
  modalitaForm: FormGroup;
  id!: number;
  modalita!: iModalita;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalitaService: ModalitaService,
    private fb: FormBuilder
  ) {
    // Inizializza il form e imposta iD_Modalita come disabilitato direttamente nel TypeScript
    this.modalitaForm = this.fb.group({
      iD_Modalita: [{ value: '', disabled: true }, Validators.required],  // Imposta il controllo come disabilitato
      tipoModalita: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.modalitaService.getModalitaById(this.id).subscribe(data => {
      this.modalita = data;
      this.modalitaForm.patchValue({
        iD_Modalita: this.modalita.iD_Modalita,
        tipoModalita: this.modalita.tipoModalita
      });
    });
  }

  onSubmit(): void {
    if (this.modalitaForm.valid) {
      const updatedModalita: iModalita = {
        iD_Modalita: this.modalita.iD_Modalita,
        tipoModalita: this.modalitaForm.get('tipoModalita')?.value
      };

      this.modalitaService.updateModalita(this.id, updatedModalita).subscribe(() => {
        this.router.navigate(['/modalita']);
      });
    }
  }

    // Metodo  per gestire la navigazione
    onCancel(): void {
      this.router.navigate(['/modalita']);
    }
}
