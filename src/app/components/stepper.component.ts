import { AfterContentInit, Component, computed, contentChild, ContentChildren, contentChildren, effect, output, QueryList, signal, Signal } from '@angular/core';
import { ProgressComponent } from "./progress.component";
import { BaseFormComponent } from './base-form.component';
import { StepComponent } from './step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <div class="container-fluid">
    <h3 class="text-center">Job Application</h3>
      <app-progress [currentStep]="currentStep()" />
      <ng-content></ng-content>

<button 
  class="btn btn-primary" 
  [disabled]="!canGoNext()" 
  (click)="isLastStep() && allStepsValid() ? submit() : nextStep()"
>
  {{ isLastStep() && allStepsValid() ? 'Submit' : 'Next' }}
</button>      
    </div>
  `,
  styles: ``
})
export class StepperComponent implements AfterContentInit {
steps: Signal<readonly StepComponent[]> = contentChildren(StepComponent, {descendants: true});

readonly currentStep = signal(0);

currentStepChange = output<number>();
  
readonly stepsValidity = signal<boolean[]>([]);

constructor() {
  effect(() =>  console.log(this.stepsValidity()))
}

  ngAfterContentInit(): void {
    const validity: boolean[] = [];
    this.steps().forEach((step, index) => {
      validity[index] = false;
      step.isValidChange.subscribe((isValid) => {
        validity[index] = isValid;
        this.stepsValidity.set([...validity]);
      });
    })
  }

nextStep(): void {
    const next = this.currentStep() + 1;
    if (this.currentStep() < this.steps().length ) {
      this.currentStep.set(next);
      this.currentStepChange.emit(next);
    }
  }

  canGoNext(): boolean {
    return this.stepsValidity()
    .slice(0, this.currentStep() + 1)
    .every((valid) => valid === true);

}
readonly isLastStep = computed(() =>
  this.currentStep() === this.steps().length - 1
);

readonly allStepsValid = computed(() =>
  this.stepsValidity().length === this.steps().length &&
  this.stepsValidity().every((valid) => valid === true)
);

submit(): void {
  const allForms = this.steps();
  const allData = allForms.map((form) => {
  const formValue = form.form()?.form.getRawValue();
  return formValue; 
  });
  const mergedData = Object.assign({}, ...allData);
  console.log('Dane jako jeden obiekt:', mergedData);
}

}