import { Component, Input } from "@angular/core";

@Component({
  selector: "app-navbar-link",
  templateUrl: "./navbar-link.component.html",
  styleUrls: ["./navbar-link.component.sass"],
})
export class NavbarItemLinkComponent {
  @Input() redirectUrl = "";
  @Input() activeUrl = "";
  @Input() label = "";
}
