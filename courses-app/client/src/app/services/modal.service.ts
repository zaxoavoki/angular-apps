import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalComponent[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  open(id: string) {
    this.modals.find((modal) => modal.uid === id)?.open();
  }

  remove(id: string) {
    this.modals = this.modals.filter((modal) => modal.uid !== id);
  }

  close(id: string) {
    this.modals.find((modal) => modal.uid === id)?.close();
  }
}
