import { Component, forwardRef } from '@angular/core';
import { BaseFormComponent } from './base-form.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: BaseFormComponent,
      useExisting: forwardRef(() => PersonalDetailsComponent),
    },
  ],
  template: `
    <div class="py-2">
      <h1 class="fs-5 ">Personal Details</h1>
      <form class="d-flex flex-column gap-2" [formGroup]="form">
        <div class="">
          <input
            class="form-control {{ getValidationClass('firstName') }}"
            formControlName="firstName"
            type="text"
            id="firstName"
            placeholder="first name"
          />
          @for (error of getErrors('firstName'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('lastName') }}"
            formControlName="lastName"
            type="text"
            id="lastName"
            placeholder="last name"
          />
          @for (error of getErrors('lastName'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('email') }}"
            formControlName="email"
            type="email"
            id="email"
            placeholder="email"
          />
          @for (error of getErrors('email'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('phone') }}"
            formControlName="phone"
            type="text"
            id="phone"
            placeholder="phone"
          />
          @for (error of getErrors('phone'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class PersonalDetailsComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
}
