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
      useExisting: forwardRef(() => PersonalDetailsComponent)
    }
  ],
  template: `
  <div class="p-3 ">
    <h1 class="fs-4">Personal Details</h1>
    <form class="d-flex flex-column gap-2" [formGroup]="form">

      <div class="">
      <input class="form-control" formControlName="firstName" type="text" id="firstName" placeholder="first name"  />
      <small></small>
      </div>

      <div class="">
      <input class="form-control" formControlName="lastName" type="text" id="lastName" placeholder="last name"  />
      <small></small>
      </div>
      
      <div class="">
      <input class="form-control" formControlName="email" type="email" id="email" placeholder="email"  />
      <small></small>
      </div>

      <div class="">
      <input class="form-control" formControlName="phone" type="text" id="phone" placeholder="phone"  />
      <small></small>
      </div>

    </form>
    </div>
  `,
  styles: ``
})
export class PersonalDetailsComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    })
  }

  


}
