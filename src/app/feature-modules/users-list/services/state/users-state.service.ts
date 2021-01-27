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

  constructor(private userDataService: UsersDataService) {}

  public applyAction(action: UserAction, user: UserInfoI): void {
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

  public updateUsers(): void {
    this.userActionLoading$.next(true);

    this.userDataService
      .getUsers()
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private addUser(user: UserInfoI): void {
    this.userActionLoading$.next(true);

    this.userDataService
      .addUser(user)
      .pipe(switchMap(() => this.userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private updateUser(user: UserInfoI): void {
    this.userActionLoading$.next(true);

    this.userDataService
      .updateUser(user)
      .pipe(switchMap(() => this.userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private removeUser(user: UserInfoI): void {
    this.userActionLoading$.next(true);

    this.userDataService
      .removeUser(user)
      .pipe(switchMap(() => this.userDataService.getUsers()))
      .subscribe((usersList) => this._updateUsersList(usersList));
  }

  private _updateUsersList(usersList: UserInfoI[]): void {
    this.usersList$.next(usersList);
    this.userActionLoading$.next(false);
  }
}
