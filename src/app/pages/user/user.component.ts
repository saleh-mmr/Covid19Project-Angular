import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  logo = 'assets/who.jpg';
  flag = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  route(): void{
    this.router.navigate(['signup']);
  }

  changeform(): void{
    this.flag = ! this.flag;
  }

}
