import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import AOS from 'aos';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserSignupSuccessfullyComponent} from '../user-signup-successfully/user-signup-successfully.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;
  durationInSeconds = 5;
  isLogin = true;


  @ViewChild('main') main: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  // tslint:disable-next-line:max-line-length variable-name
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginFormGroup = formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
    this.signupFormGroup = formBuilder.group({
      username : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{6,15}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      cpassword: ['', [Validators.required]]
    });
  }

  turnToSignUp(): void{
    this.main.nativeElement.classList.remove('col-11');
    this.sidebar.nativeElement.classList.remove('col-1');
    this.main.nativeElement.classList.add('col-1');
    this.sidebar.nativeElement.classList.add('col-11');
    this.isLogin = false;
  }

  turnToSignIn(): void{
    this.main.nativeElement.classList.add('col-11');
    this.sidebar.nativeElement.classList.add('col-1');
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.isLogin = true;
  }

  ngOnInit(): void {
    AOS.init();
    this.isLogin = true;
  }

  // tslint:disable-next-line:typedef
  login(){
    if (this.loginFormGroup.invalid){
      this.api.changeMessage('نام کاربری یا پسورد اشتباه است');
      this.openSnackBar();
    }
    else{
      this.auth.login(this.loginFormGroup.value).subscribe(data => {
        if (data.access){
          this.router.navigate(['/profile']);
        }
      });
    }
  }

  // tslint:disable-next-line:typedef
  openSnackBar() {
    this._snackBar.openFromComponent(UserSignupSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  // tslint:disable-next-line:typedef
  signup(){
    if (this.signupFormGroup.invalid){
      if (this.signupFormGroup.controls.username.invalid){
        this.api.changeMessage('لطفا نام کاربری دیگری انتخاب کنید');
        this.openSnackBar();
        this.signupFormGroup.controls.username.setValue('');
      }
      if (this.signupFormGroup.controls.email.invalid){
        this.api.changeMessage('لطفا یک ایمیل معتبر وارد کنید');
        this.openSnackBar();
        this.signupFormGroup.controls.email.setValue('');
      }
      if (this.signupFormGroup.controls.password.invalid){
        this.api.changeMessage('لطفا پسورد خود را مجدد بررسی کنید');
        this.openSnackBar();
        this.signupFormGroup.controls.password.setValue('');
        this.signupFormGroup.controls.cpassword.setValue('');
      }
    }
    else {
      this.api.signup(this.signupFormGroup.value).subscribe(data => {
        this.api.changeMessage('حساب کاربری شما با موفقیت ایجاد شد');
        this.openSnackBar();
      });
      this.signupFormGroup.controls.username.setValue('');
      this.signupFormGroup.controls.email.setValue('');
      this.signupFormGroup.controls.password.setValue('');
      this.signupFormGroup.controls.cpassword.setValue('');
    }

  }

}
