import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  signupForm: FormGroup;
  image1 = 'assets/3.png';


  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{6,15}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      cpassword: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  signup(){
    if (this.signupForm.invalid){
      if (this.signupForm.controls.username.invalid){
        console.log('usename!');
      }
      if (this.signupForm.controls.email.invalid){
        console.log('email!');
      }
      if (this.signupForm.controls.password.invalid){
        console.log('password!');
      }
      console.log('Something might be wrong!');
    }
    else {
      this.api.signup(this.signupForm.value).subscribe(data => {
      });
      this.signupForm.controls.username.setValue('');
      this.signupForm.controls.email.setValue('');
      this.signupForm.controls.password.setValue('');
      this.signupForm.controls.cpassword.setValue('');
    }

  }



}
