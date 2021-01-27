import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editable-textfield',
  templateUrl: './editable-textfield.component.html',
  styleUrls: ['./editable-textfield.component.scss'],
})
export class EditableTextfieldComponent implements OnInit {
  @Input() value: string;

  @Input() validators: ValidatorFn | ValidatorFn[] | null = null;

  @Input() mask = (v: any) => v;

  @Output() saveValue = new EventEmitter<string>();

  public editMode = false;

  public ctrl = new FormControl();

  private _subs = new Subscription();

  set subs(sub: Subscription) {
    this._subs.add(sub);
  }

  constructor() {
    this.value = '';
  }

  ngOnInit(): void {
    this.ctrl.setValue(this.value);
    this.ctrl.setValidators(this.validators);

    this.subs = this.ctrl.valueChanges.subscribe((value) => {
      this.ctrl.setValue(this.mask(value), {
        emitEvent: false,
      });
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  save() {
    this.saveValue.emit(this.ctrl.value);
    this.editMode = false;
  }
}
