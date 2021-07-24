import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  user$?: Observable<User | null>;
  search: string = '';

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.user$ = this.authService.user$();
  }

  logout() {
    this.authService.logout();
  }

  showModal(id: string) {
    this.modalService.open(id);
  }
}
