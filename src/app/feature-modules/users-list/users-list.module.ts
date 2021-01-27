import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersListTableComponent } from './pages/users-list-table/users-list-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { EditableTextfieldComponent } from './components/editable-textfield/editable-textfield.component';
import { PhonePipe } from './pipe/phone.pipe';

@NgModule({
  declarations: [UsersListTableComponent, UserFormComponent, EditableTextfieldComponent, PhonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersListTableComponent,
      },
    ]),
  ],
  entryComponents: [UserFormComponent],
})
export class UsersListModule {}
