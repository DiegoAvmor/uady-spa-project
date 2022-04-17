import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  activeUrl = "";
  searchTerm = "";

  constructor(private router: Router) {
    this.router = router;
    this.activeUrl = router.url;

    // Listen to url changes.
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const navigationEnd = value as NavigationEnd;
        this.activeUrl = navigationEnd.url;
      }
    });
  }

  performSearch() {
    this.router.navigateByUrl(`/search?query=${this.searchTerm}`);
  }

  loginButtonCallback() {
    console.log("Login button has been clicked.");
  }

  signUpButtonCallback() {
    console.log("Sign up button has been clicked.");
  }
}
