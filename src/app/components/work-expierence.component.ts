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
    <div class="p-3 ">
      <h1 class="fs-4">Work Experience</h1>
      <form class="d-flex flex-column gap-2" [formGroup]="form">
        <div class="">
          <input
            class="form-control"
            formControlName="company"
            type="text"
            id="company"
            placeholder="company"
          />
          <small></small>
        </div>

        <div class="">
          <input
            class="form-control"
            formControlName="position"
            type="text"
            id="position"
            placeholder="position"
          />
          <small></small>
        </div>

        <div class="">
          <input
            class="form-control"
            formControlName="startDate"
            type="text"
            id="startDate"
            placeholder="start date"
          />
          <small></small>
        </div>

        <div class="">
          <input
            class="form-control"
            formControlName="endDate"
            type="text"
            id="endDate"
            placeholder="end Date"
          />
          <small></small>
        </div>

        <div class="">
          <textarea
            class="form-control"
            formControlName="description"
            type="text"
            id="description"
            placeholder="description"
          ></textarea>
          <small></small>
        </div>
      </form>
    </div>
  `,
  styles: ``,
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
