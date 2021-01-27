import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class EditableTextfieldComponent implements OnInit, OnDestroy {
  @Input() value: string;

  @Output() saveValue = new EventEmitter<string>();

  @Input() validators: ValidatorFn | ValidatorFn[] | null = null;

  @Input() mask: (v: string) => string;

  public editMode = false;

  public ctrl = new FormControl();

  public prevValue = '';

  private subscriptions = new Subscription();

  set subs(sub: Subscription) {
    this.subscriptions.add(sub);
  }

  constructor() {
    this.value = '';
    this.mask = (v: string) => v;
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
    this.subscriptions.unsubscribe();
  }

  save(): void {
    this.saveValue.emit(this.ctrl.value);
    this.editMode = false;
  }

  cancel(): void {
    this.saveValue.emit(this.prevValue);
    this.editMode = false;
    this.ctrl.setValue(this.prevValue);
  }

}
