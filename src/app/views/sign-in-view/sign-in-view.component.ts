import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-sign-in-view",
  templateUrl: "./sign-in-view.component.html",
  styleUrls: ["./sign-in-view.component.sass"],
})
export class SignInViewComponent implements OnInit {
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = new FormBuilder().group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  get form() {
    return this.signInForm.controls;
  }
}
