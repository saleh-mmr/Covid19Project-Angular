import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';


export interface PeriodicElement {
  position: number;
  fname: string;
  lname: string;
  nationalcode: string;
  disease: string;
  status: string;
  id: number;
  add: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  displayedColumns: string[] = ['add', 'disease', 'status', 'nationalcode', 'lname', 'fname', 'position'];
  dataSource = ELEMENT_DATA;
  private a: any;


  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    // this.dataSource = [];
    this.auth.get_user_reports().subscribe(data => {
      // @ts-ignore
      if (data.flag === true){
        this.dataSource = [];
        let i = 0;
        // tslint:disable-next-line:forin
        for (const key in data) {
          const value = data[key];
          if (key === 'flag'){

          }else {
            i = i + 1;
            // tslint:disable-next-line:max-line-length
            this.dataSource.push({add: 'افزودن فرد مرتبط', id: value.id, disease: value.disease, status: value.patientstatus, nationalcode: value.nationalcode, lname: value.lastname, fname: value.firstname, position: i});
          }
        }
      }
    });
  }
}
