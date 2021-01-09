import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

  // tslint:disable-next-line:typedef
  signup(data){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8000/signup/' , data , {headers: header});
  }

  // tslint:disable-next-line:typedef
  summary(){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get('http://api.covid19api.com/summary' , {headers: header});
  }

  // tslint:disable-next-line:typedef
  world_total(){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://api.covid19api.com/world/total' , {headers: header});
  }

  // tslint:disable-next-line:typedef
  by_Country_All_Status(date1, date2){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    // tslint:disable-next-line:max-line-length
    const str = 'http://api.covid19api.com/country/iran?from=' + date1 + 'T00:00:00Z&to=' + date2 + 'T00:00:00Z';
    return this.http.get(str , {headers: header});  }


  // tslint:disable-next-line:typedef
  get_corona_statistics(){
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get('http://127.0.0.1:8000/corona_statistics/' , {headers: header});
  }

}


