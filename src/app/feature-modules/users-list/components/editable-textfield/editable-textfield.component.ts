import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-editable-textfield',
  templateUrl: './editable-textfield.component.html',
  styleUrls: ['./editable-textfield.component.scss'],
})
export class EditableTextfieldComponent implements OnInit {
  @Input() value = '';

  @Input() mask = '';

  @Output() saveValue = new EventEmitter<string>();

  @Input() validators: ValidatorFn | ValidatorFn[] | null = null;

  public editMode = false;

  public ctrl = new FormControl();

  public prevValue = '';

  constructor() {}

  ngOnInit(): void {
    this.ctrl.setValue(this.value);
    this.ctrl.setValidators(this.validators);
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
