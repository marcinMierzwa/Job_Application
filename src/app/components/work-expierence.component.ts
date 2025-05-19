import { Component, forwardRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormComponent } from './base-form.component';

@Component({
  selector: 'app-work-expierence',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: BaseFormComponent,
      useExisting: forwardRef(() => WorkExpierenceComponent),
    },
  ],
  template: `
    <div class="fade-in mt-3">
      <h1 class="fs-5">Work Experience</h1>
      <form class="d-flex flex-column gap-2" [formGroup]="form">
        <div class="">
          <input
            class="form-control {{ getValidationClass('company') }}"
            formControlName="company"
            type="text"
            id="company"
            placeholder="company"
          />
          @for (error of getErrors('company'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('position') }}"
            formControlName="position"
            type="text"
            id="position"
            placeholder="position"
          />
          @for (error of getErrors('position'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('startDate') }}"
            formControlName="startDate"
            type="text"
            id="startDate"
            placeholder="start date"
          />
          @for (error of getErrors('startDate'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('endDate') }}"
            formControlName="endDate"
            type="text"
            id="endDate"
            placeholder="end Date"
          />
          @for (error of getErrors('endDate'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <textarea
            class="form-control {{ getValidationClass('description') }}"
            formControlName="description"
            type="text"
            id="description"
            placeholder="description"
          ></textarea>
          @for (error of getErrors('description'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>
      </form>
    </div>
  `,
  styles: `
  .fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  `,
})
export class WorkExpierenceComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
