import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserAction, UserActionsEnum } from '../../enums/user-actions-enum';
import { PhonePipe } from '../../pipe/phone.pipe';
import phoneNumberValidator from '../../validators/phoneValidator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [PhonePipe],
})
export class UserFormComponent implements OnInit {
  @Input() action: UserAction;

  public nameCtrl = new FormControl(null, [Validators.required]);
  public emailCtrl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);
  public phoneCtrl = new FormControl(null, [
    Validators.required,
    phoneNumberValidator,
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

  private _subs = new Subscription();

  set subs(sub: Subscription) {
    this._subs.add(sub);
  }

  constructor(
    private _phonePipe: PhonePipe,
    private _dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.action = UserActionsEnum.Add;
  }

  ngOnInit(): void {
    this.subs = this.phoneCtrl.valueChanges.subscribe((value) => {
      this.phoneCtrl.setValue(this._phonePipe.transform(value), {
        emitEvent: false,
      });
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  confirm() {
    this._dialogRef.close(this.userForm.value);
  }
}
