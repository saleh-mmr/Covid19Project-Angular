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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editreport',
  templateUrl: './editreport.component.html',
  styleUrls: ['./editreport.component.css']
})
export class EditreportComponent implements OnInit {
  patientinfoForm: FormGroup;
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
  puserdisease = '';
  psystemdisease = '';
  pstatus = '';
  pid = 0;
  flag = true;
  flag1 = false;
  allSymptoms: string[] = ['تب', 'سر درد', 'سرفه خشک', 'خستگی', 'گلو درد', 'تنگی نفس', 'آبریزش بینی'];

  @ViewChild('symptomInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _formBuilder: FormBuilder, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: ActivatedRoute, private route: Router) {
    this.patientinfoForm = this.formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      phoneNumber : ['', [Validators.required]],
      nationalCode : ['', [Validators.required]],
      birthDate : ['', [Validators.required]],
      symptoms : ['', [Validators.required]],
      patientStatus : ['', [Validators.required]],
      diseaseStatus : ['', [Validators.required]],
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  edit_current_report(stepper: MatStepper): void{
    this.patientinfoForm.controls.symptoms.setValue(this.symptom);
    if (this.patientinfoForm.invalid){
      console.log('INVALID FORM');
    }
    else{
      this.auth.edit_report(this.router.snapshot.params.id, this.patientinfoForm.value).subscribe(data => {
        this.flag1 = data.flag;
        if (this.flag1 === true){
          stepper.next();
          this.pfName = data.first_name;
          this.plName = data.last_name;
          this.pphone = data.phone_number;
          this.pcode = data.national_code;
          this.pbirth = data.birth_date;
          this.puserdisease = data.user_disease;
          this.psystemdisease = data.system_disease;
          this.pstatus = data.patient_status;
        }
      });
    }





  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // console.log(this.router.snapshot.params.id);
    this.auth.get_patient_info(this.router.snapshot.params.id).subscribe(data => {
      // @ts-ignore
      this.flag = data.flag;
      if (this.flag === false){
        this.route.navigate(['/notfound']);
      }
      else {
        // @ts-ignore
        this.patientinfoForm.controls.firstName.setValue(data.firstname);
        // @ts-ignore
        this.patientinfoForm.controls.lastName.setValue(data.lastname);
        // @ts-ignore
        this.patientinfoForm.controls.phoneNumber.setValue(data.phonenumber);
        // @ts-ignore
        this.patientinfoForm.controls.nationalCode.setValue(data.nationalcode);
        // @ts-ignore
        this.patientinfoForm.controls.birthDate.setValue(data.birthdate);
      }
    });
  }

}
