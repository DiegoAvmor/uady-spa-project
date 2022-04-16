import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

// How to highlight current view in nav bar.

// Solution #1:
// - Detect in this component when the active route changes.
// - When that happens, set a prop on the nav bar buttons for the active route.
// - The navbar buttons would compare the provided active route against the route
//   they are forwarding to. If it matches, they set a CSS style for the style.
//   Otherwise, they set some different style.

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  activeUrl: string;

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
}
