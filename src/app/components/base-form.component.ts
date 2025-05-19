import { Component, computed, Directive, effect, inject, output, Signal, signal } from '@angular/core';
import { FormControlStatus, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class BaseFormComponent {
  protected formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );

  form: FormGroup = this.buildForm();

  protected abstract buildForm(): FormGroup;

  readonly isValid = output<boolean>();

  ngAfterViewInit() {
    this.form.statusChanges.subscribe((status: FormControlStatus) =>
      this.isValid.emit(status === "VALID")
    );
  }

}


// private readonly formStatusSignal = toSignal(
//   this.form.statusChanges.pipe(distinctUntilChanged()),
//   {
//     initialValue: this.form.status,
//   }
// );
//   readonly isValid: Signal<boolean> = computed(
//     () => this.formStatusSignal() === 'VALID'
//   );
//   isValidEff = effect(() => console.log(this.isValid())
//   )


