import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../types/User';

@Directive({
  selector: '[canView]',
})
export class CanViewDirective implements OnDestroy {
  private permissions: string[] = [];
  private user: User | null = null;
  private userSub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  private updateView() {
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    return (this.user?.roles || ['guest']).some((userRole) =>
      this.permissions.includes(userRole)
    );
  }

  @Input()
  set canView(value: string[]) {
    this.permissions = value;
    this.userSub = this.authService.user$().subscribe((user) => {
      this.user = user;
      this.updateView();
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
