import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInfoI } from '../../interfaces/user-info-i';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  public usersList: UserInfoI[] = [];

  constructor() {}

  addUser(user: UserInfoI): Observable<UserInfoI[]> {
    this.usersList.unshift(user);
    return of(this.usersList);
  }

  updateUser(user: UserInfoI): Observable<UserInfoI[]> {
    const indexOfTarget = this.usersList.findIndex(
      (userInfo) => userInfo.ID === user.ID
    );
    const target = this.usersList[indexOfTarget];

    Object.assign(target, user);

    return of(this.usersList);
  }

  removeUser(user: UserInfoI): Observable<UserInfoI[]> {
    this.usersList.splice(
      this.usersList.findIndex((userInfo) => userInfo.ID === user.ID),
      1
    );

    return of(this.usersList);
  }

  getUsers(): Observable<UserInfoI[]> {
    return of(this.usersList);
  }
}
