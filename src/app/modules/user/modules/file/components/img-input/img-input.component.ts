import {Component, EventEmitter, forwardRef, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-img-input',
  templateUrl: './img-input.component.html',
  styleUrls: ['./img-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImgInputComponent),
    multi: true
  }]
})
export class ImgInputComponent implements ControlValueAccessor {
  image = [];

  constructor() {
  }

  clear(): void {
    this.image = [];
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  writeValue(value: any): void {
    if (!value || Array.isArray(value) && !value.length) {
      this.clear();
      return;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setImage(): void {
    this.onTouch(this.image);
    this.onChange(this.image);
  }
}
