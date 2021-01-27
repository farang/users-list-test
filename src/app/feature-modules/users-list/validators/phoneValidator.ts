import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PHONE_REGEXP } from '../constants/validation-regexp';

export default function phoneNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  return new RegExp(PHONE_REGEXP).test(control.value)
    ? null
    : {
        phone: 'Phone is not valid',
      };
}
