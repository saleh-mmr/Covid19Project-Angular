import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  PINFOURL = 'http://127.0.0.1:8000/patient-info';
  EDITREPORTURL = 'http://127.0.0.1:8000/edit-report';
  ADDCONNECTIONURL = 'http://127.0.0.1:8000/add-connection';


  // tslint:disable-next-line:typedef
  login(data) {
    return this.http.post<any>('http://127.0.0.1:8000/login/', data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage to log user out
    this.http.get('http://127.0.0.1:8000/logout/' ).subscribe(data => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line:typedef
  get_user_info(){
    return this.http.get('http://127.0.0.1:8000/get-user-info/');
  }

  // tslint:disable-next-line:typedef
  newreport(data){
    return this.http.post<any>('http://127.0.0.1:8000/newreport/', data);
  }

  // tslint:disable-next-line:typedef
  update_patient_status(data){
    return this.http.put<any>('http://127.0.0.1:8000/newreport/', data);
  }

  // tslint:disable-next-line:typedef
  get_user_reports(){
    return this.http.get('http://127.0.0.1:8000/recent-reports/');
  }

  // tslint:disable-next-line:typedef
  get_patient_info(id){
    return this.http.get(`${this.PINFOURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  edit_report(id, data){
    return this.http.post<any>(`${this.EDITREPORTURL}/${id}`, data);
  }

  // tslint:disable-next-line:typedef
  connection(id, data){
    return this.http.post<any>(`${this.ADDCONNECTIONURL}/${id}`, data);
  }


}
