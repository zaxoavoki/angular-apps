import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../types/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnDestroy {
  private _user$ = new BehaviorSubject<User[]>([]);
  readonly users$ = this._user$.asObservable();

  private userSub: Subscription;

  constructor(
    private usersService: UsersService,
    private titleService: Title,
    private notifierService: NotifierService
  ) {
    this.userSub = this.usersService
      .getAll()
      .subscribe((users) => this._user$.next(users));
    this.titleService.setTitle('All users');
  }

  deleteUser(id: string) {
    this.usersService
      .delete(id)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.error) {
          this.notifierService.notify('error', 'Something went wrong');
          return;
        }
        this._user$.next(
          this._user$.getValue().filter((user) => user._id !== id)
        );
        this.notifierService.notify('success', 'User was deleted successfully');
      });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
