import { AfterContentInit, Component, ContentChildren, contentChildren, effect, output, QueryList, signal, Signal } from '@angular/core';
import { ProgressComponent } from "./progress.component";
import { BaseFormComponent } from './base-form.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <div class="">

      <app-progress />

      <ng-content></ng-content>

      <button class="btn btn-primary" [disabled]="!canGoNext()" (click)="nextStep()">Next</button>
      
    </div>
  `,
  styles: ``
})
export class StepperComponent implements AfterContentInit {

forms: Signal<readonly BaseFormComponent[]> = contentChildren(BaseFormComponent, {descendants: true});

readonly currentStep = signal(0);

currentStepChange = output<number>();
  
readonly stepsValidity = signal<boolean[]>([]);

constructor() {
  effect(() =>  console.log(this.stepsValidity()))
}

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
    console.log({
      currentStep: this.currentStep(),
      next,
      formsLength: this.forms().length,
      isNextDisabled: !this.canGoNext(),
      validityArray: this.stepsValidity(),
      formsCount: this.forms().length
    });
    
    // Changed condition to make it work with array bounds
    if (this.currentStep() < this.forms().length - 1) {
      console.log("working");
      this.currentStep.set(next);
      this.currentStepChange.emit(next);
    }
  }

  canGoNext(): boolean {
    const index = this.currentStep();
    return this.stepsValidity()[index] === true;
  }

}
