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
  
  // Inizializzazione delle proprietà
  id: number = 0;  // Inizializzazione a 0 o null
  modalita: iModalita | undefined;  // Inizializzazione a undefined o un oggetto vuoto

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private modalitaService: ModalitaService,
    private fb: FormBuilder
  ) {
    this.modalitaForm = this.fb.group({
      iD_Modalita: [{ value: '', disabled: true }, Validators.required],
      tipoModalita: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;  // Recupera l'ID dalla rotta e conferma che non è null
    this.modalitaService.getModalitaById(this.id).subscribe(data => {
      this.modalita = data;
      this.modalitaForm.patchValue({
        iD_Modalita: this.modalita.iD_Modalita,
        tipoModalita: this.modalita.tipoModalita
      });
    });
  }

  onSubmit(): void {
    if (this.modalitaForm.valid && this.modalita) {  // Aggiunta di un controllo per assicurarsi che modalita non sia null o undefined
      const updatedModalita: iModalita = {
        iD_Modalita: this.modalita.iD_Modalita,
        tipoModalita: this.modalitaForm.get('tipoModalita')?.value
      };

      this.modalitaService.updateModalita(this.id, updatedModalita).subscribe(() => {
        this.router.navigate(['/modalita/list']);
      });
    }
  }
}
