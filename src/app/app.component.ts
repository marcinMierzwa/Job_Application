import { Component, signal } from '@angular/core';
import { StepperComponent } from './components/stepper.component';
import { PersonalDetailsComponent } from './components/personal-details.component';
import { WorkExpierenceComponent } from './components/work-expierence.component';
import { SkillsComponent } from './components/skills.component';
import { PortfolioComponent } from './components/portfolio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepperComponent,
    PersonalDetailsComponent,
    WorkExpierenceComponent,
    SkillsComponent,
    PortfolioComponent,
  ],
  template: `
    <app-stepper (currentStepChange)="onStepChange($event)">
      <app-personal-details [hidden]="currentStep() < 0" />
      <app-work-expierence [hidden]="currentStep() < 1" />
      <app-skills [hidden]="currentStep() < 2" />
      <app-portfolio [hidden]="currentStep() < 3" />
    </app-stepper>
  `,
})
export class AppComponent {
  readonly currentStep = signal(0);

  onStepChange(step: number) {
    this.currentStep.set(step);
  }
}
