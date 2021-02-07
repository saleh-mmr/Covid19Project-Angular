import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import AOS from 'aos';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  panelOpenState = false;
  image1 = 'assets/images/illustration.png';
  QuestionForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.QuestionForm = this.formBuilder.group({
      question : ['', [Validators.required]],
    });
  }



  ngOnInit(): void {
    AOS.init();
  }

  // tslint:disable-next-line:typedef
  ask(){
    console.log('ask');
  }

}
