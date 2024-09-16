import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalitaService } from '../../modalita.service';

@Component({
  selector: 'app-modalita-delete',
  templateUrl: './modalita-delete.component.html'
})
export class ModalitaDeleteComponent implements OnInit {
  id: number | undefined;

  constructor(private route: ActivatedRoute, private modalitaService: ModalitaService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  deleteModalita(): void {
    if (this.id) {
      this.modalitaService.deleteModalita(this.id).subscribe(() => {
        // Redirect o gestisci post-eliminazione
        this.router.navigate(['/modalita']);
      });
    }
  }
}
