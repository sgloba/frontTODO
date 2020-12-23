import {Component, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import {OptionsI} from "../../models/app.options.model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field'

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleBtnComponent),
    multi: true
  }]
})
export class ToggleBtnComponent implements ControlValueAccessor {

  constructor() { }

  form: FormGroup = new FormGroup({
  });


  @Input() options: OptionsI[]
  @Output() optionsChange = new EventEmitter()


  toggleActive(option) {
    this.options = this.options.map( item => {
      if(item.title === option.title) {
        item.active = !item.active
      }
      return item
    })
    this.optionsChange.emit(this.options)
  }



  ///////////////////////////////////

  value = 0;
  disabled = false;
  private onChange = (value: any) => {};

  private onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: number) {
    // получить из Forms API
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(insideValue: number) {
    this.value = insideValue; // html
    this.onChange(insideValue); // уведомить Forms API
    this.onTouched();
  }
}
