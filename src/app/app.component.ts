import { Component } from '@angular/core';
import { StepperComponent } from './components/stepper.component';
import { PersonalDetailsComponent } from './components/personal-details.component';
import { WorkExpierenceComponent } from "./components/work-expierence.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StepperComponent, PersonalDetailsComponent, WorkExpierenceComponent],
  template: `
    <app-stepper>
      <app-personal-details />
      <app-work-expierence />
    </app-stepper>
  `
})
export class AppComponent {
}
