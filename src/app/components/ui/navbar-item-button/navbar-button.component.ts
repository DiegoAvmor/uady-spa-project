import { Component, Input } from "@angular/core";
import { UserSession } from "src/app/models/user-session";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar-button",
  templateUrl: "./navbar-button.component.html",
  styleUrls: ["./navbar-button.component.sass"],
})
export class NavbarItemButtonComponent {
  @Input() label!: string;
  @Input() allowedUserRoles!: string[];
  @Input() allowedNonAuthUser = false;
  @Input() denyRender = false;
  @Input() callback!: () => void;

  userIsAllowed = false;

  ngOnInit(): void {
    const userSession = this.authService.getUserSessionSync();
    this.updateUserAllowance(userSession);
  }

  constructor(private authService: AuthService) {
    // Listen to user session changes.
    this.authService.getUserSession().subscribe((userSession) => {
      this.updateUserAllowance(userSession);
    });
  }

  private updateUserAllowance(userSession: UserSession | null): void {
    if (
      userSession !== null &&
      !this.isActiveUserRoleAllowed(userSession.jwt.payload.user.role)
    ) {
      this.userIsAllowed = false;
      return;
    }

    if (userSession === null && !this.allowedNonAuthUser) {
      this.userIsAllowed = false;
      return;
    }

    this.userIsAllowed = true;
  }

  private isActiveUserRoleAllowed(role: string) {
    return this.allowedUserRoles.includes(role);
  }
}
