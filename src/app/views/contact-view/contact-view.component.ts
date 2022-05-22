import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import emailjs from '@emailjs/browser';
@Component({
  selector: "app-contact-view",
  templateUrl: "./contact-view.component.html",
  styleUrls: ["./contact-view.component.sass"],
})
export class ContactViewComponent implements OnInit {
  contactForm!: FormGroup;

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
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

  }
}
