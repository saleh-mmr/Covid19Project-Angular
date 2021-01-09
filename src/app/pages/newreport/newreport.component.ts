import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-newreport',
  templateUrl: './newreport.component.html',
  styleUrls: ['./newreport.component.css']
})
export class NewreportComponent implements OnInit {
  patientinfoForm: FormGroup;
  patientstatusForm: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  symptomCtrl = new FormControl();
  filteredSymptoms: Observable<string[]>;
  symptom: string[] = [];
  response = '';
  pfName = '';
  plName = '';
  pphone = '';
  pcode = '';
  pbirth = '';
  pid = 0;
  flag = false;
  flag1 = false;
  allSymptoms: string[] = ['تب', 'سر درد', 'سرفه خشک', 'خستگی', 'گلو درد', 'تنگی نفس', 'آبریزش بینی'];


  @ViewChild('symptomInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private formBuilder: FormBuilder, private auth: AuthenticationService) {
    this.patientinfoForm = this.formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      phoneNumber : ['', [Validators.required]],
      nationalCode : ['', [Validators.required]],
      birthDate : ['', [Validators.required]],
      symptoms : ['', [Validators.required]],
    });

    this.patientstatusForm = this.formBuilder.group({
      patientStatus : ['', [Validators.required]],
      diseaseStatus : ['', [Validators.required]],
      patientid : ['', []],
    });

    this.filteredSymptoms = this.symptomCtrl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => symptom ? this._filter(symptom) : this.allSymptoms.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.symptom.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.symptomCtrl.setValue(null);
  }

  remove(s: string): void {
    const index = this.symptom.indexOf(s);

    if (index >= 0) {
      this.symptom.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.symptom.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.symptomCtrl.setValue(null);
  }

  new_report(stepper: MatStepper): void{
   this.patientinfoForm.controls.symptoms.setValue(this.symptom);
   this.pfName = this.patientinfoForm.controls.firstName.value;
   this.plName = this.patientinfoForm.controls.lastName.value;
   this.pphone = this.patientinfoForm.controls.phoneNumber.value;
   this.pcode = this.patientinfoForm.controls.nationalCode.value;
   this.pbirth = this.patientinfoForm.controls.birthDate.value;
   if (this.patientinfoForm.invalid){
     console.log('Patient Form Invalid!');
   }
   else {
     stepper.next();
     this.auth.newreport(this.patientinfoForm.value).subscribe(data => {
       if (data.illness){
         this.response = data.illness;
         this.flag = data.flag;
         this.pid = data.patientid;
         if (data.flag === true){
           this.patientinfoForm.controls.firstName.disable();
           this.patientinfoForm.controls.lastName.disable();
           this.patientinfoForm.controls.phoneNumber.disable();
           this.patientinfoForm.controls.nationalCode.disable();
           this.patientinfoForm.controls.birthDate.disable();
           this.patientinfoForm.controls.symptoms.disable();
         }
       }
     });
   }
 }

  update_current_report(): void{
   this.patientstatusForm.controls.patientid.setValue(this.pid);
   if (this.patientstatusForm.invalid){
     console.log('Patient Status Form Invalid!');
   }
   else {
     this.auth.update_patient_status(this.patientstatusForm.value).subscribe(data => {
       this.flag1 = data.flag;
       if (data.flag === true){
         this.patientstatusForm.controls.patientStatus.disable();
         this.patientstatusForm.controls.diseaseStatus.disable();
       }
     });
   }

 }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
