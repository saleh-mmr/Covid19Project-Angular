import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-user-signup-successfully',
  templateUrl: './user-signup-successfully.component.html',
  styleUrls: ['./user-signup-successfully.component.css']
})
export class UserSignupSuccessfullyComponent implements OnInit {

  message: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.currentMessage.subscribe( message => {
      this.message = message;
    });
  }

}
