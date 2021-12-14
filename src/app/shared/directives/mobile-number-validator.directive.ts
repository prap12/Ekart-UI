import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validateMobNum]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MobileNumberValidatorDirective,
    multi: true
  }]
})
export class MobileNumberValidatorDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    return this.patternValidator()(control);
  }

  patternValidator() {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      const regex = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidNumber: true };
    };
  }

}
