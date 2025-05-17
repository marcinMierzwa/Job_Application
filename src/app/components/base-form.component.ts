import { Directive, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder } from "@angular/forms";

@Directive()
export abstract class BaseFormComponent {
    
    protected formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
    
    form: FormGroup = this.buildForm();

    protected abstract buildForm(): FormGroup;

}