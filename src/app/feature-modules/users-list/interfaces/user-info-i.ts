import { UserAction } from '../enums/user-actions-enum';

export interface UserInfoI {
  ID: number;
  Name: string;
  Email: string;
  Phone: string;
  Actions: UserAction[];
}
