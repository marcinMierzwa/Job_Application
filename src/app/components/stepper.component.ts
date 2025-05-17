import { Component } from '@angular/core';
import { ProgressComponent } from "./progress.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <div class="">

      <app-progress />

      <ng-content></ng-content>

      <button class="btn btn-primary">Next</button>
      
    </div>
  `,
  styles: ``
})
export class StepperComponent {

}
