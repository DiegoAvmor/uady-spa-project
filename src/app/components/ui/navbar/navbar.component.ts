import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  activeUrl!: string;
  searchTerm!: string;

  constructor(private router: Router) {
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
}
