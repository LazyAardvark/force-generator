import {Component, inject} from '@angular/core';
import {Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';


@Component({
  selector: 'fg-roller-setup',
   imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    NgIf],
  templateUrl: './roller-setup.component.html',
   styleUrl: './roller-setup.component.css',
  
 
})
export class RollerSetupComponent {

  private formBuilder = inject(FormBuilder);
  
  forceBuilderForm = this.formBuilder.group({
      roster: [''],
      battleValue : ['0', Validators.required],
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
