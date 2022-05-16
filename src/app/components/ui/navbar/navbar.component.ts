import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  activeUrl!: string;
  searchTerm!: string;

  constructor(private router: Router, private authService: AuthService) {
    this.activeUrl = router.url;

    // Listen to url changes.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navigationEnd = event as NavigationEnd;
        this.activeUrl = navigationEnd.url;
      }
    });
  }

  performSearch() {
    if (this.searchTerm) {
      this.router.navigateByUrl(`/search?query=${this.searchTerm}`);
    }
  }

  isUserAuthenticated(): boolean {
    return this.authService.getUserSessionSync() !== null;
  }

  destroyUserSession = (): void => {
    this.authService.destroyUserSession();
    this.router.navigate(["/home"]);
  };

  get username(): string {
    const userSession = this.authService.getUserSessionSync();

    if (userSession === null) {
      return "";
    }
    return userSession.jwt.payload.user.name;
  }
}
