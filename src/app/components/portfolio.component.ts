import { Component, forwardRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormComponent } from './base-form.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: BaseFormComponent,
      useExisting: forwardRef(() => PortfolioComponent)
    }
  ],
  template: `
    <div class="fade-in mt-3">
      <h1 class="fs-5">Portfolio</h1>
      <form class="d-flex flex-column gap-2" [formGroup]="form">

        <div class="">
          <input
            class="form-control"
            formControlName="portfolioUrl"
            type="text"
            id="portfolioUrl"
            placeholder="portfolio link"
          />
          <small></small>
        </div>

        <div class="">
          <input
            class="form-control"
            formControlName="linkedin"
            type="text"
            id="linkedin"
            placeholder="linkedin link"
          />
          <small></small>
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
export class PortfolioComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      portfolioUrl: ['', Validators.required],
      linkedin: ['', Validators.required],
    });
  }
}

  


