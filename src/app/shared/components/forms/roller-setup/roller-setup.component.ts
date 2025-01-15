import {Component, inject} from '@angular/core';
import {Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fg-roller-setup',
  imports: [ReactiveFormsModule],
  templateUrl: './roller-setup.component.html',
  styleUrl: './roller-setup.component.scss',
  
 
})
export class RollerSetupComponent {

  private formBuilder = inject(FormBuilder);
  
  forceBuilderForm = this.formBuilder.group({
      roster: [''],
      battleValue : ['0', Validators.required, Validators.],
      battleValueTolerance: [''],
      baseSkillLevel:[''],
      allowOfficers: [''],
      allowDuplicates: [''],
    });
  

  onSubmit() {
    const formValue = this.forceBuilderForm.value;
    console.log("Force Generator Configuration Value :" , formValue);
  }
}
