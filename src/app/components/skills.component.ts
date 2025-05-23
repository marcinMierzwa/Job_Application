import { Component, forwardRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormComponent } from './base-form.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: BaseFormComponent,
      useExisting: forwardRef(() => SkillsComponent),
    },
  ],
  template: `
    <div class="fade-in mt-3">
      <h1 class="fs-5">Skills</h1>
      <form class="d-flex flex-column gap-2" [formGroup]="form">
        <div class="">
          <input
            class="form-control {{ getValidationClass('primarySkill') }}"
            formControlName="primarySkill"
            type="text"
            id="primarySkill"
            placeholder="primary skill"
          />
          @for (error of getErrors('primarySkill'); track error) {
          <small class="py-1 text-danger">{{ error }}</small>
          }
        </div>

        <div class="">
          <input
            class="form-control {{ getValidationClass('secondarySkill') }}"
            formControlName="secondarySkill"
            type="text"
            id="secondarySkill"
            placeholder="secondary skill"
          />
          @for (error of getErrors('secondarySkill'); track error) {
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
export class SkillsComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      primarySkill: ['', Validators.required],
      secondarySkill: ['', Validators.required],
    });
  }
}
