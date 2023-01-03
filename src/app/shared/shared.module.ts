import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
// import { ModalService } from '../services/modal.service';

@NgModule({
  declarations: [ModalComponent, TabsContainerComponent, TabComponent],
  imports: [CommonModule],
  exports: [ModalComponent, TabsContainerComponent, TabComponent],

  // Should do this if Modal Service Injectable decorator doesn't have "providedIn: root"
  // providers: [ModalService],
})
export class SharedModule {}
