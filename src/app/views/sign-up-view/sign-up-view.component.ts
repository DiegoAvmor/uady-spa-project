import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up-view.component.html',
  styleUrls: ['./sign-up-view.component.sass']
})
export class SignUpViewComponent implements OnInit {

  signUpForm!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormBuilder().group(
      {
        username: new FormControl("",Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("",Validators.required),
        repeatPassword: new FormControl("",[Validators.required]),
      }
    )
  }

  validatePassword(e:any){
    let confirmPassword = e.value;
    if(this.form["password"].value != confirmPassword){
      this.form["repeatPassword"].setErrors({notSame:true});
    }
  }

  get form(){
    return this.signUpForm.controls;
  }

}