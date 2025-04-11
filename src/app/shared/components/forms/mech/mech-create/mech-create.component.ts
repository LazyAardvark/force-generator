import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MechType } from '../../../../../core/enums/mech-type';
import { UnitType } from '../../../../../core/enums/unit-type';
import { MechService } from '../../../../../core/services/mech.service';
import { Mech } from '../../../../../core/interfaces/mech';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { UnitClass } from '../../../../../core/enums/unit-class';
import { UnitFactoryService } from '../../../../../core/services/unit-factory.service';


@Component({
  selector: 'fg-mech-creation',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    ],
  templateUrl: './mech-create.component.html'
})
export class MechCreationComponent {
   
    private formBuilder = inject(FormBuilder);
    private mechService = inject(MechService);
    private unitFactory = inject(UnitFactoryService);
    private mechList$ : Observable<Mech[]> = this.mechService.get();
    mechList : Signal<Mech[]> = toSignal(this.mechList$, { initialValue: [] });
    constructor() {
    }

    mechManagerForm = this.formBuilder.group({
      type: [UnitType.battlemech],
      battleValue: ['0', Validators.required],
      name: [''],
      variant: [''],
      tonnage: [0],
      mechType: [MechType.battle],
      class: [UnitClass.light],
      role: []
    });  
  
    onSubmit() {
      const formValue : any = this.mechManagerForm.value;
      console.log("Force Generator Configuration Value :", formValue);
      this.unitFactory.createUnit("Mech", formValue);
    }
}
