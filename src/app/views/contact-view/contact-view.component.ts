import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import emailjs from '@emailjs/browser';
@Component({
  selector: "app-contact-view",
  templateUrl: "./contact-view.component.html",
  styleUrls: ["./contact-view.component.sass"],
})
export class ContactViewComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormBuilder().group({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required]),
    });
  }

  get form() {
    return this.contactForm.controls;
  }
  submitContactForm(): void{
    emailjs.init("iIkY2dC1ZB5DxdT5_");
    const templateValues= {
      from_name: this.form["name"].value,
      message: this.form["comment"].value,
      from_email: this.form["email"].value

    };
    emailjs.send('service_p02zkrj', 'template_96plt0d', templateValues)
    .then(() => {
       this.snackBar.open("Email was send successfully", "Dismiss", {
        duration: 3000,
      });
    }, () => {
       this.snackBar.open("Something went wrong", "Dismiss", {
        duration: 3000,
      });
    });

  }
}
