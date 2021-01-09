import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  image1 = 'assets/3.png';

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }


  login(): void{
    if (this.loginForm.invalid){
      console.log('Something might be wrong!');
    }
    else {
      this.auth.login(this.loginForm.value).subscribe(data => {
        if (data.access){
          this.router.navigate(['/profile']);
        }
      });
    }
  }



  ngOnInit(): void {
  }
}
