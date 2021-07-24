import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [],
})
export class UserCardComponent {
  readonly authUser$;
  @Input() user: User | null = null;
  @Output() onDeleteUser = new EventEmitter<string>();

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.user$();
  }

  deleteUser(id: string) {
    // can replace it with global users service
    this.onDeleteUser.emit(id);
  }
}
