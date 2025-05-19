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
  this.form.statusChanges
    .pipe(distinctUntilChanged())
    .subscribe((status: FormControlStatus) => {
      this.isValid.emit(status === 'VALID');
    });

}

getErrors(controlName: string): string[] {
  const control = this.form.get(controlName);
  if (control && control.invalid && (control.dirty || control.touched)) {
    const messages: string[] = [];
    const errors = control.errors;

    if (errors?.['required']) {
      messages.push('This field is required.');
    }

    if (errors?.['email']) {
      messages.push('Email must be an email.');
    }

    return messages;
  }
  return [];
}

getValidationClass(controlName: string): string {
  const control = this.form.get(controlName);
  if (!control) return '';

  if (control.invalid && (control.dirty || control.touched)) {
    return 'is-invalid';
  }

  if (control.valid && (control.dirty || control.touched)) {
    return 'is-valid';
  }

  return '';
}

}
