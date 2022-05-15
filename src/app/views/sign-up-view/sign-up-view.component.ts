import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { AuthRoles } from "src/app/config/AuthRoles";
import { User } from "src/app/models/user";
import { UserRole } from "src/app/models/user-role";
import { AuthService } from "src/app/services/auth.service";
import { PasswordValidator } from "src/app/validators/PasswordValidator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorCodes } from "src/app/config/ErrorCodes";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up-view",
  templateUrl: "./sign-up-view.component.html",
  styleUrls: ["./sign-up-view.component.sass"],
})
export class SignUpViewComponent implements OnInit {
  signUpForm!: FormGroup;

  private errorMessages = new Map();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.errorMessages.set(ErrorCodes.SER04, "Username not available");
    this.errorMessages.set(ErrorCodes.SYS01, "Unexpected error");
    this.errorMessages.set(ErrorCodes.SYS02, "Unexpected error");
  }

  ngOnInit(): void {
    const passwordFormControl = new FormControl("", Validators.required);

    this.signUpForm = new FormBuilder().group({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: passwordFormControl,
      passwordRepetition: new FormControl("", [
        Validators.required,
        PasswordValidator.repetition(passwordFormControl),
      ]),
    });
  }

  get controls() {
    return this.signUpForm.controls;
  }

  submitSignUpForm(): void {
    firstValueFrom(
      this.authService.createUser({
        name: this.controls["username"].value,
        password: this.controls["password"].value,
        email: this.controls["email"].value,
        role: { name: AuthRoles.REGULAR } as UserRole,
      } as User)
    )
      .then(() => {
        this.snackBar.open("User creation successful 😄", "Dismiss", {
          duration: 3000,
        });
        this.router.navigate(["/signin"]);
      })
      .catch((error: HttpErrorResponse) => {
        const errorCode = error.error.code as string;
        this.snackBar.open(this.errorMessages.get(errorCode), "Dismiss", {
          duration: 3000,
        });
      });
  }
}
