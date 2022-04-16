import { Component, Input } from "@angular/core";

@Component({
  selector: "app-navbar-item-button",
  templateUrl: "./navbar-item-button.component.html",
  styleUrls: ["./navbar-item-button.component.sass"],
})
export class NavbarItemButtonComponent {
  @Input() callback = () => {};
  @Input() label = "";
}
