import { Component, Input } from "@angular/core";

@Component({
  selector: "app-navbar-item-link",
  templateUrl: "./navbar-item-link.component.html",
  styleUrls: ["./navbar-item-link.component.sass"],
})
export class NavbarItemLinkComponent {
  @Input() redirectUrl = "";
  @Input() activeUrl = "";
  @Input() label = "";
}
