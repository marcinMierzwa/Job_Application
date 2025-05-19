import { Component, signal } from '@angular/core';
import { StepperComponent } from './components/stepper.component';
import { PersonalDetailsComponent } from './components/personal-details.component';
import { WorkExpierenceComponent } from './components/work-expierence.component';
import { SkillsComponent } from './components/skills.component';
import { PortfolioComponent } from './components/portfolio.component';
import { StepComponent } from './components/step.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepperComponent,
    StepComponent,
    PersonalDetailsComponent,
    WorkExpierenceComponent,
    SkillsComponent,
    PortfolioComponent,
  ],
  template: `
    <app-stepper (currentStepChange)="onStepChange($event)">
      <app-step [visible]="currentStep() >= 0">
        <app-personal-details />
      </app-step>
      <app-step [visible]="currentStep() >= 1">
        <app-work-expierence />
      </app-step>
      <app-step [visible]="currentStep() >= 2">
        <app-skills />
      </app-step>
      <app-step [visible]="currentStep() >= 3">
        <app-portfolio />
      </app-step>
    </app-stepper>
  `,
})
export class AppComponent {
  readonly currentStep = signal(0);

  onStepChange(step: number) {
    this.currentStep.set(step);
  }
}
