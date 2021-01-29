import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PHONE_MASK } from '../../constants/masks';
import { UserAction, UserActionsEnum } from '../../enums/user-actions-enum';
import CustomValidators from '../../validators/CustomValidators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() action: UserAction;

  public nameCtrl = new FormControl(null, [Validators.required]);
  public emailCtrl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);
  public phoneCtrl = new FormControl(null, [
    Validators.required,
    CustomValidators.phone,
  ]);

  public userForm = new FormGroup({
    Name: this.nameCtrl,
    Email: this.emailCtrl,
    Phone: this.phoneCtrl,
    Actions: new FormControl([
      UserActionsEnum.Add,
      UserActionsEnum.Edit,
      UserActionsEnum.Remove,
    ]),
    ID: new FormControl(null),
  });

  public userActionsEnum = UserActionsEnum;

  public PHONE_MASK = PHONE_MASK;

  constructor(private dialogRef: MatDialogRef<UserFormComponent>) {
    this.action = UserActionsEnum.Add;
  }

  confirm(): void {
    this.dialogRef.close(this.userForm.value);
  }
}
