import { Component, Input, OnInit } from "@angular/core";
import { UserSession } from "src/app/models/user-session";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar-link",
  templateUrl: "./navbar-link.component.html",
  styleUrls: ["./navbar-link.component.sass"],
})
export class NavbarItemLinkComponent implements OnInit {
  @Input() redirectUrl!: string;
  @Input() activeUrl!: string;
  @Input() label!: string;
  @Input() allowedUserRoles!: string[];
  @Input() allowedNonAuthUser = false;
  @Input() denyRendering = false;

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
