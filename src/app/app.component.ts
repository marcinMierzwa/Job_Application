import { Component, signal } from '@angular/core';
import { StepperComponent } from './components/stepper.component';
import { PersonalDetailsComponent } from './components/personal-details.component';
import { WorkExpierenceComponent } from "./components/work-expierence.component";
import { SkillsComponent } from "./components/skills.component";
import { PortfolioComponent } from "./components/portfolio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StepperComponent, PersonalDetailsComponent, WorkExpierenceComponent, SkillsComponent, PortfolioComponent],
  template: `
<app-stepper (currentStepChange)="onStepChange($event)">
  
      @if (currentStep() >= 0) {
        <app-personal-details />
      }
      @if (currentStep() >= 1) {
        <app-work-expierence />
      }
      @if (currentStep() >= 2) {
        <app-skills />
      }
      @if (currentStep() >= 3) {
        <app-portfolio />
      }
    </app-stepper>  `
})
export class AppComponent {
  readonly currentStep = signal(0);

  onStepChange(step: number) {
    this.currentStep.set(step);
  }
}
