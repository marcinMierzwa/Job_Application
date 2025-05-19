import { Component, computed, input } from '@angular/core';

interface progressOptions {
  completed: string;
  value: string
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  template: `
<div class="w-25 ms-auto d-flex align-items-center gap-3 border border-primary border-opacity-50 py-1 px-2 rounded-4">
  <p class="m-0 text-primary text-opacity-75">completed</p>
  <div class="progress w-100" role="progressbar" aria-label="Example with label" aria-valuemin="0" aria-valuemax="100">
    <div
      class="progress-bar"
      [style.width]="progressOptions().value"
    >
      {{ progressOptions().value }}
    </div>
  </div>
</div>  `,
  styles: ``
})
export class ProgressComponent {
readonly currentStep = input<number>()
readonly progressOptions = computed<progressOptions>(() => {
    const step = this.currentStep();
    const percent = (step! + 1) * 25; 

    return {
      completed: `width: ${percent}%`,
      value: `${percent}%`,
    };
  });

}
