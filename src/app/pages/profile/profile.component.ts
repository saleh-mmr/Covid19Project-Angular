import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  token: string;
  x: any;
  y: any;
  flag = false;
  logo = 'assets/who.jpg';
  avatar = 'assets/avatar.jpg';
  titrflag0 = false;
  titrflag1 = false;
  titrflag2 = false;

  @ViewChild('main') main: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(private auth: AuthenticationService, private router: Router) { }


  logout(): void{
    this.auth.logout();
  }

  show_new_report_page(): void{
    this.flag = true;
    this.titrflag0 = true;
    this.titrflag1 = false;
    this.titrflag2 = false;
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.main.nativeElement.classList.add('col-9');
    this.sidebar.nativeElement.classList.add('col-3');
  }

  show_recent_report_page(): void{
    this.flag = true;
    this.titrflag0 = false;
    this.titrflag1 = true;
    this.titrflag2 = false;
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.main.nativeElement.classList.add('col-9');
    this.sidebar.nativeElement.classList.add('col-3');
  }

  show_related_people_page(): void{
    this.flag = true;
    this.titrflag0 = true;
    this.titrflag1 = true;
    this.titrflag2 = false;
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.main.nativeElement.classList.add('col-9');
    this.sidebar.nativeElement.classList.add('col-3');
  }

  show_editprofile_page(): void{
    this.flag = true;
    this.titrflag0 = false;
    this.titrflag1 = false;
    this.titrflag2 = true;
    this.main.nativeElement.classList.remove('col-1');
    this.sidebar.nativeElement.classList.remove('col-11');
    this.main.nativeElement.classList.add('col-9');
    this.sidebar.nativeElement.classList.add('col-3');
  }

  return(): void{
    this.router.navigate(['/profile']);
    this.main.nativeElement.classList.remove('col-9');
    this.sidebar.nativeElement.classList.remove('col-3');
    this.main.nativeElement.classList.add('col-1');
    this.sidebar.nativeElement.classList.add('col-11');
    this.flag = false;
    this.titrflag0 = false;
    this.titrflag1 = false;
    this.titrflag2 = false;
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
    this.auth.get_user_info().subscribe(data => {
      // @ts-ignore
      this.x = data.username;
      // @ts-ignore
      this.y = data.email;
    });
  }

}
