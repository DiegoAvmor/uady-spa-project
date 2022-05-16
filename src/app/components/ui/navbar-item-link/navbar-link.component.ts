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

  inlineStyle: string;

  ngOnInit(): void {
    const userSession = this.authService.getUserSessionSync();
    this.updateInlineStyle(userSession);
  }

  constructor(private authService: AuthService) {
    // Listen to user session changes.
    this.authService.getUserSession().subscribe((userSession) => {
      this.updateInlineStyle(userSession);
    });
  }

  private updateInlineStyle(userSession: UserSession | null) {
    if (
      userSession === null ||
      this.isActiveUserRoleAllowed(userSession.jwt.payload.user.role)
    ) {
      this.inlineStyle = "";
    } else {
      this.inlineStyle = "display: none;";
    }
  }

  private isActiveUserRoleAllowed(role: string) {
    return this.allowedUserRoles.includes(role);
  }
}
