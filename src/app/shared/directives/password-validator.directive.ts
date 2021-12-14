import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validatePassword]',
  providers: [{
     provide: NG_VALIDATORS,
     useExisting: PasswordValidatorDirective,
     multi: true
    }]
})
export class PasswordValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return this.patternValidator()(control);
  }

  patternValidator() {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
