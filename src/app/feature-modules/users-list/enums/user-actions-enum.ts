export enum UserActionsEnum {
  Add = 'Add',
  Edit = 'Edit',
  Remove = 'Remove',
}

export type UserAction =
  | UserActionsEnum.Add
  | UserActionsEnum.Edit
  | UserActionsEnum.Remove;
