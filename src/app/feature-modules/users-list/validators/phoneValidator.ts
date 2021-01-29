import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function phoneNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value?.length === 10
    ? null
    : {
        phone: 'Phone is not valid',
      };
}
