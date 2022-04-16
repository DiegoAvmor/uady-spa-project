import { Component, Input } from "@angular/core";

@Component({
  selector: "app-navbar-button",
  templateUrl: "./navbar-button.component.html",
  styleUrls: ["./navbar-button.component.sass"],
})
export class NavbarItemButtonComponent {
  @Input() callback = () => {};
  @Input() label = "";
}
