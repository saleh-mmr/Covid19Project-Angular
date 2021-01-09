import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.css']
})
export class AddConnectionComponent implements OnInit {
  connectionForm: FormGroup;


  constructor(private http: HttpClient, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.connectionForm = this.formBuilder.group({
      phoneNumber : ['', [Validators.required]],
      email : ['', [Validators.required]]
    });
  }

  add_connection(): void{
    if (this.connectionForm.invalid){
      console.log('Something might be wrong!');
    }
    else {
      this.auth.connection(this.route.snapshot.params.id, this.connectionForm.value).subscribe(data => {
        console.log(data);
        if (data.flag === true){
          this.connectionForm.controls.phoneNumber.setValue('');
          this.connectionForm.controls.email.setValue('');
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
