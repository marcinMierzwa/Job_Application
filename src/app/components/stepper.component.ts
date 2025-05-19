import {
  AfterContentInit,
  Component,
  computed,
  contentChildren,
  inject,
  output,
  signal,
  Signal,
} from '@angular/core';
import { ProgressComponent } from './progress.component';
import { BaseFormComponent } from './base-form.component';
import { AlertService } from '../alert.service';

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
  private readonly alertService: AlertService = inject(AlertService);

  forms: Signal<readonly BaseFormComponent[]> = contentChildren(
    BaseFormComponent,
    { descendants: true }
  );

  readonly currentStep = signal(0);

  readonly currentStepChange = output<number>();

  readonly stepsValidity = signal<boolean[]>([]);

  ngAfterContentInit(): void {
    const validity: boolean[] = [];

    this.forms().forEach((form, index) => {
      validity[index] = false;
      form.isValid.subscribe((isValid) => {
        validity[index] = isValid;
        this.stepsValidity.set([...validity]);
      });
    });
  }

  nextStep(): void {
    const next = this.currentStep() + 1;
    if (this.currentStep() < this.forms().length) {
      this.currentStep.set(next);
      this.currentStepChange.emit(next);
    }
  }

  canGoNext(): boolean {
    const validity = this.stepsValidity();
    if (validity.length !== this.forms().length) return false;

    return validity
      .slice(0, this.currentStep() + 1)
      .every((valid) => valid === true);
  }
  readonly isLastStep = computed(
    () => this.currentStep() === this.forms().length - 1
  );

  readonly allStepsValid = computed(
    () =>
      this.stepsValidity().length === this.forms().length &&
      this.stepsValidity().every((valid) => valid === true)
  );

  submit(): void {
    const allForms = this.forms();
    const allData = allForms.map((form) => {
      const formValue = form.form.getRawValue();
      return formValue;
    });
    const mergedData = Object.assign({}, ...allData);
    this.alertService.displayAlert('form successfully sent');
    console.log('form:', mergedData);
    this.forms().forEach((form) => {
      form.resetForm();
    });
  }
}
