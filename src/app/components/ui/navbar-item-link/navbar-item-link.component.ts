import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar-item-link",
  templateUrl: "./navbar-item-link.component.html",
  styleUrls: ["./navbar-item-link.component.sass"],
})
export class NavbarItemLinkComponent implements OnInit {
  @Input() redirectUrl = "";
  @Input() activeUrl = "";
  @Input() label = "";

  ngOnInit(): void {}
}
