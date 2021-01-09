import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreportComponent } from './newreport.component';

describe('NewreportComponent', () => {
  let component: NewreportComponent;
  let fixture: ComponentFixture<NewreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
