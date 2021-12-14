import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[matchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true,
  }]
})
export class MatchPasswordDirective implements Validators {

  @Input('matchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.comparePassword(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }

  comparePassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pwdCtrl = formGroup.controls[password];
      const confirmPwdCtrl = formGroup.controls[confirmPassword];

      if (!pwdCtrl || !confirmPwdCtrl) {
        return null;
      }

      if (confirmPwdCtrl.errors && !confirmPwdCtrl.errors.passwordMismatch) {
        return null;
      }

      if (pwdCtrl.value !== confirmPwdCtrl.value) {
        confirmPwdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwdCtrl.setErrors(null);
      }
    };
  }
}
