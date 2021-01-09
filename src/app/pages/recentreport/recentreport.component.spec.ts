import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentreportComponent } from './recentreport.component';

describe('RecentreportComponent', () => {
  let component: RecentreportComponent;
  let fixture: ComponentFixture<RecentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
