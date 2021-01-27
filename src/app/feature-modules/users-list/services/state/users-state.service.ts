import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserAction, UserActionsEnum } from '../../enums/user-actions-enum';
import { UserInfoI } from '../../interfaces/user-info-i';
import { UsersDataService } from '../data/users-data.service';

@Injectable({
  providedIn: 'root',
})
export class UsersStateService {
  public usersList$ = new BehaviorSubject<UserInfoI[]>([]);

  public userActionLoading$ = new BehaviorSubject(true);

  constructor(private _userDataService: UsersDataService) {}

  public applyAction(action: UserAction, user: UserInfoI) {
    switch (action) {
      case UserActionsEnum.Add: {
        this.addUser(user);

        break;
      }
      case UserActionsEnum.Edit: {
        this.updateUser(user);

        break;
      }
      case UserActionsEnum.Remove: {
        this.removeUser(user);

        break;
      }
    }
  }

  public updateUsers() {
    this.userActionLoading$.next(true);

    this._userDataService
      .getUsers()
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private addUser(user: UserInfoI) {
    this.userActionLoading$.next(true);

    this._userDataService
      .addUser(user)
      .pipe(switchMap(() => this._userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private updateUser(user: UserInfoI) {
    this.userActionLoading$.next(true);

    this._userDataService
      .updateUser(user)
      .pipe(switchMap(() => this._userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private removeUser(user: UserInfoI) {
    this.userActionLoading$.next(true);

    this._userDataService
      .removeUser(user)
      .pipe(switchMap(() => this._userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private _updateUsersList(usersList: UserInfoI[]) {
    this.usersList$.next(usersList);
    this.userActionLoading$.next(false);
  }
}
