import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],

  // If you aren't creating providers in shared module, then this option is also valid
  // providers: [ModalService],
})
export class ModalComponent implements OnInit {
  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.toggleModal();
  }
}
