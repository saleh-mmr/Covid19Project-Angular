  import { Component, OnInit } from '@angular/core';
  import {ApiService} from '../../services/api.service';
  import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
  import { Label } from 'ng2-charts';
  import AOS from 'aos';
  import {Router} from "@angular/router";

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {

    image1 = 'assets/images/illustration.png';
    image2 = 'assets/images/hero_1.jpg';
    date = new Date();
    doctor = 'assets/doctor.jpg';
    ToDate: string;
    FromDate: string;
    TotalConfirmed: any;
    TotalDeaths: any;
    TotalRecovered: any;
    public barChartOptions: ChartOptions = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartData: ChartDataSets[] = [];
    constructor(private api: ApiService, private router: Router) {
    }

    calculate_params(): void{
      let currenttMonth = this.date.getMonth();
      let currentDay = this.date.getDate();
      let calculatedMonth: string;
      let calculatedDay: string;
      if (currenttMonth == 0){
        currenttMonth = currenttMonth + 1;
        calculatedMonth = '0' + currenttMonth;
        this.date.setMonth(1);
      }
      else if (currenttMonth < 10){
        calculatedMonth = '0' + currenttMonth;
        this.date.setMonth(currenttMonth);
      }
      else {
        calculatedMonth = currenttMonth + '';
        this.date.setMonth(currenttMonth);
      }
      if (currentDay == 0){
        currentDay = currentDay + 1;
        calculatedDay = '0' + currentDay;
      }
      else if (currentDay < 10){
        calculatedDay = '0' + currentDay;
      }
      else {
        calculatedDay = currentDay + '';
      }
      this.ToDate = this.date.getFullYear() + '-' + calculatedMonth + '-' + calculatedDay;
      currentDay = this.date.getDate() - 9;
      let x: string;
      if (currentDay == 0){
        currentDay = currentDay + 1;
        x = '0' + currentDay;
      }
      else if (currentDay < 10){
        x = '0' + currentDay;
      }
      else {
        x = currentDay + '';
      }
      this.FromDate = this.date.getFullYear() + '-' + calculatedMonth + '-' +  x;
    }

    push_ChartLabel(index: number): void{
      const currentYear = this.date.getFullYear();
      const currentMonth = this.date.getMonth();
      const currentDay = this.date.getDate();
      if (index == 0){
        const label: string = currentYear + '-' + currentMonth + '-' + currentDay + '';
        this.barChartLabels.push(label);
        return;
      }
      else{
        this.date.setDate(this.date.getDate() - index);
        let a = this.date.getFullYear();
        let b = this.date.getMonth();
        const c = this.date.getDate();
        if (b == 0){
          b = 12;
          a = a - 1;
        }
        const label: string = a + '-' + b + '-' + c + '';
        this.barChartLabels.push(label);
        this.date.setDate(this.date.getDate() + index);
        return;
      }

    }

    ngOnInit(): void {
      AOS.init();

      this.calculate_params();
      for (let i = 6; i > -1; i--){
        this.push_ChartLabel(i);
      }

      const confirmedResult = [];
      const deathsResult = [];
      const recoveredResult = [];
      const activeResult = [];

      this.api.world_total().subscribe(data => {
        this.TotalConfirmed = data['TotalConfirmed'];
        this.TotalDeaths = data['TotalDeaths'];
        this.TotalRecovered = data['TotalRecovered'];
      });

      this.api.by_Country_All_Status(this.FromDate, this.ToDate).subscribe(data => {
        // tslint:disable-next-line:forin
        for (const key in data) {
          confirmedResult.push(data[key].Confirmed);
          deathsResult.push(data[key].Deaths);
          recoveredResult.push(data[key].Recovered);
        }
        const confirmedFirst = confirmedResult[0];
        const deathsFirst = deathsResult[0];
        const recoveredFirst = recoveredResult[0];

        const confirmedFinal = [];
        const deathsFinal = [];
        const recoveredFinal = [];

        for (const i in confirmedResult){
          // @ts-ignore
          if (i == 1){
            const current = confirmedResult[1] - confirmedFirst;
            confirmedFinal.push(current);
          }
          else { // @ts-ignore
            if (i > 1){
                      // @ts-ignore
              const current = confirmedResult[i] - confirmedResult[i - 1];
              confirmedFinal.push(current);
                    }
          }
        }

        this.barChartData.pop();
        this.barChartData.push({data: confirmedFinal, label: 'تایید شده', backgroundColor: 'rgba(0, 123, 255, .2)' });

        for (const i in deathsResult){
          // @ts-ignore
          if (i == 1){
            const current = deathsResult[1] - deathsFirst;
            deathsFinal.push(current);
          }
          else { // @ts-ignore
            if (i > 1){
              // @ts-ignore
              const current = deathsResult[i] - deathsResult[i - 1];
              deathsFinal.push(current);
            }
          }
        }
        this.barChartData.push({data: deathsFinal, label: 'جان باخته', backgroundColor: 'rgba(33, 97, 140, .2)' });

        for (const i in recoveredResult){
          // @ts-ignore
          if (i == 1){
            const current = recoveredResult[1] - recoveredFirst;
            recoveredFinal.push(current);
          }
          else { // @ts-ignore
            if (i > 1){
              // @ts-ignore
              const current = recoveredResult[i] - recoveredResult[i - 1];
              recoveredFinal.push(current);
            }
          }
        }
        this.barChartData.push({data: recoveredFinal, label: 'بهبود یافته', backgroundColor: 'rgba(75, 115, 223, .2)' });
      });

    }


    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    // tslint:disable-next-line:typedef
    routeToSignin(){
      this.router.navigate(['/user']);
    }
    // tslint:disable-next-line:typedef
    routeToSignup(){
      this.router.navigate(['/user']);
    }


  }
