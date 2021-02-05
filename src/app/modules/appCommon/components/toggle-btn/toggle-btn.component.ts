import {Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FormGroup,
} from '@angular/forms';
import {OptionsI} from '../../models/app.options.model';

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

  @Input() options: OptionsI[];

  value = 0;
  disabled = false;

  toggleActive(option): void {
    this.options = this.options.map( item => {
      if (item.title === option.title) {
        item.active = !item.active;
      }
      return item;
    });
    this.onTouched();
    this.onChange(this.options);
  }
  // for future use
  private onChange = (value: any) => {};

  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
 // for future use
  writeValue(outsideValue: number): void {
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(insideValue: number):void {
    this.value = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }
}
