import { Component, OnInit } from "@angular/core";
import {
  FormBuilder, FormControl, FormGroup, Validators
} from "@angular/forms";

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
      name: new FormControl("", [Validators.required] ),
      comment: new FormControl("", [Validators.required]),
    });

  }

  get form(){
    return this.contactForm.controls;
  }
}
