import {
  Component,
  contentChild,
  input,
  output,
  signal,
  Signal,
} from '@angular/core';
import { BaseFormComponent } from './base-form.component';

@Component({
  selector: 'app-step',
  standalone: true,
  template: ` 
  @if (visible()) {
  <ng-content></ng-content> 
  }
  `
  ,
})
export class StepComponent {
  visible = input<boolean>(false);
  form: Signal<BaseFormComponent | undefined> = contentChild(BaseFormComponent);

  readonly isValidChange = output<boolean>();

  ngAfterContentInit(): void {
    const formInstance = this.form();
    if (formInstance) {
      formInstance.isValid.subscribe((valid) => {
        this.isValidChange.emit(valid);
      });
    }
  }
}
