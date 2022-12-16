import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
// import { ModalService } from '../services/modal.service';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent],

  // Should do this if Modal Service Injectable decorator doesn't have "providedIn: root"
  // providers: [ModalService],
})
export class SharedModule {}
