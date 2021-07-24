import { Modal } from 'bootstrap';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() uid!: string;
  private element: any;
  private modal!: Modal | null;

  constructor(private modalService: ModalService, private el: ElementRef) {}

  ngOnInit() {
    if (!this.uid) {
      console.error('ID must be provided for modal');
      return;
    }

    this.element = this.el.nativeElement;
    this.modal = new Modal(this.element.children[0]);

    this.modalService.add(this);
  }

  open() {
    this.modal?.show();
  }

  close() {
    this.modal?.hide();
  }

  ngOnDestroy() {
    this.modalService.remove(this.uid as string);
    this.element.remove();
  }
}
