import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { firstValueFrom } from "rxjs";
import { ErrorCodes } from "src/app/config/ErrorCodes";
import { UserCredentials } from "src/app/models/user-credentials";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sign-in-view",
  templateUrl: "./sign-in-view.component.html",
  styleUrls: ["./sign-in-view.component.sass"],
})
export class SignInViewComponent implements OnInit {
  signInForm!: FormGroup;

  private errorMessages = new Map();

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.errorMessages.set(ErrorCodes.SER03, "Incorrect username or password");
    this.errorMessages.set(ErrorCodes.SYS01, "Unexpected error");
    this.errorMessages.set(ErrorCodes.SYS02, "Unexpected error");
  }

  ngOnInit(): void {
    this.signInForm = new FormBuilder().group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  get controls() {
    return this.signInForm.controls;
  }

  submitSignInForm(): void {
    firstValueFrom(
      this.authService.getJwt({
        name: this.controls["username"].value,
        password: this.controls["password"].value,
      } as UserCredentials)
    )
      .then((res) => alert("Success:" + JSON.stringify(res)))
      .catch((error: HttpErrorResponse) => {
        const errorCode = error.error.code as string;
        this.snackBar.open(this.errorMessages.get(errorCode), "Dismiss", {
          duration: 3000,
        });
      });
  }
}
