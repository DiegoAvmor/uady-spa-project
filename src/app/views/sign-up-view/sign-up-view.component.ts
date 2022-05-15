import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { environment as env } from "src/environments/environment";
import { AUTH_ROLES } from "src/app/config/AUTH_ROLES";
import { User } from "src/app/models/user";
import { UserRole } from "src/app/models/user-role";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sign-up-view",
  templateUrl: "./sign-up-view.component.html",
  styleUrls: ["./sign-up-view.component.sass"],
})
export class SignUpViewComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormBuilder().group({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      passwordAgain: new FormControl("", Validators.required),
    });
  }

  get controls() {
    return this.signUpForm.controls;
  }

  validatePassword() {
    if (
      this.controls["password"].value != this.controls["passwordAgain"].value
    ) {
      this.controls["passwordAgain"].setErrors({ notSame: true });
    }
  }

  submitSignUpForm() {
    firstValueFrom(
      this.authService.createUser({
        name: this.controls["username"].value,
        password: this.controls["password"].value,
        email: this.controls["email"].value,
        role: { name: AUTH_ROLES.REGULAR } as UserRole,
      } as User)
    );
  }
}
