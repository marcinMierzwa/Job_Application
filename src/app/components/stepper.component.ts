import {
  AfterContentInit,
  Component,
  computed,
  contentChild,
  ContentChildren,
  contentChildren,
  effect,
  output,
  QueryList,
  signal,
  Signal,
} from '@angular/core';
import { ProgressComponent } from './progress.component';
import { BaseFormComponent } from './base-form.component';
import { StepComponent } from './step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <div
      class="container-fluid w-50 border shadow shadow-sm rounded-3 p-3 mt-3 "
    >
      <h1 class="text-center p-2 fs-3 ">Job Application</h1>
      <app-progress [currentStep]="currentStep()" />
      <ng-content></ng-content>

      <button
        class="btn btn-sm btn-primary mt-3 d-block mx-auto rounded"
        [disabled]="!canGoNext()"
        (click)="isLastStep() && allStepsValid() ? submit() : nextStep()"
      >
        {{ isLastStep() && allStepsValid() ? 'Submit' : 'Next' }}
      </button>
    </div>
  `,
  styles: [
    `
      @media (max-width: 520px) {
        .container-fluid {
          width: 100% !important;
        }
      }
    `,
  ],
})
export class StepperComponent implements AfterContentInit {
  steps: Signal<readonly StepComponent[]> = contentChildren(StepComponent, {
    descendants: true,
  });

  readonly currentStep = signal(0);

  currentStepChange = output<number>();

  readonly stepsValidity = signal<boolean[]>([]);

  constructor() {
    effect(() => console.log(this.stepsValidity()));
  }

  ngAfterContentInit(): void {
    const validity: boolean[] = [];
    this.steps().forEach((step, index) => {
      validity[index] = false;
      step.isValidChange.subscribe((isValid) => {
        validity[index] = isValid;
        this.stepsValidity.set([...validity]);
      });
    });
  }

  nextStep(): void {
    const next = this.currentStep() + 1;
    if (this.currentStep() < this.steps().length) {
      this.currentStep.set(next);
      this.currentStepChange.emit(next);
    }
  }

  canGoNext(): boolean {
    const validity = this.stepsValidity();
    if (validity.length !== this.steps().length) return false;

    return validity
      .slice(0, this.currentStep() + 1)
      .every((valid) => valid === true);
  }
  readonly isLastStep = computed(
    () => this.currentStep() === this.steps().length - 1
  );

  readonly allStepsValid = computed(
    () =>
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
