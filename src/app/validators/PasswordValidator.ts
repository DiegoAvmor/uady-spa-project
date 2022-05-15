import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator {
  static repetition(passwordControl: AbstractControl): ValidatorFn {
    return (
      passwordRepetitionControl: AbstractControl
    ): ValidationErrors | null => {
      if (passwordRepetitionControl.value !== passwordControl.value) {
        return { notSame: "Password repetition does not match first password" };
      }
      return null;
    };
  }
}
