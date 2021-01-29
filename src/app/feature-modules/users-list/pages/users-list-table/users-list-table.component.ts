import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfoI } from '../../interfaces/user-info-i';
import { UsersStateService } from '../../services/state/users-state.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserActionsEnum } from '../../enums/user-actions-enum';
import { filter } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PHONE_MASK } from '../../constants/masks';
import CustomValidators from '../../validators/CustomValidators';

@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrls: ['./users-list-table.component.scss'],
})
export class UsersListTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Name', 'Email', 'Phone', 'Actions'];

  public usersList: UserInfoI[] = [];

  public userActionsEnum = UserActionsEnum;

  public validators = Validators;

  public customValidators = CustomValidators;

  private subscriptions = new Subscription();

  set subs(sub: Subscription) {
    this.subscriptions.add(sub);
  }

  public PHONE_MASK = PHONE_MASK;

  constructor(
    public dialog: MatDialog,
    private userStateService: UsersStateService
  ) {}

  ngOnInit(): void {
    this.subs = this.userStateService.usersList$.subscribe((usersList) => {
      this.usersList = usersList.slice();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateField(userinfo: any, fieldName: any, value: any): void {
    userinfo[fieldName] = value;

    this.userStateService.applyAction(UserActionsEnum.Edit, userinfo);
  }

  showNewUserPopup(): void {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => !!data))
      .subscribe((userinfo: UserInfoI) => {
        userinfo.ID = this.userStateService.usersList$.value.length;
        this.userStateService.applyAction(UserActionsEnum.Add, userinfo);
      });
  }

  deleteRecord(user: UserInfoI): void {
    if (confirm(`Are you sure you want to delete the user ${user.Name}?`)) {
      this.userStateService.applyAction(UserActionsEnum.Remove, user);
    }
  }

  editRecord(user: UserInfoI): void {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.componentInstance.action = UserActionsEnum.Edit;
    dialogRef.componentInstance.userForm.patchValue(user);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => !!data))
      .subscribe((userinfo: UserInfoI) => {
        if (userinfo) {
          this.userStateService.applyAction(UserActionsEnum.Edit, userinfo);
        }
      });
  }
}
