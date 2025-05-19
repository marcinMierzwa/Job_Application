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
      useExisting: forwardRef(() => SkillsComponent)
    }
  ],
  template: `
  <div class="p-3 ">
    <h1 class="fs-4">Skills</h1>
    <form class="d-flex flex-column gap-2" [formGroup]="form">

      <div class="">
      <input class="form-control" formControlName="primarySkill" type="text" id="primarySkill" placeholder="primary skill"  />
      <small></small>
      </div>

      <div class="">
      <input class="form-control" formControlName="secondarySkill" type="text" id="secondarySkill" placeholder="secondary skill"  />
      <small></small>
      </div>
      
    </form>
    </div>
  `,
  styles: ``
})
export class SkillsComponent extends BaseFormComponent {
  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      primarySkill: ['', Validators.required],
      secondarySkill: ['', Validators.required],
    })
  }

  


}
