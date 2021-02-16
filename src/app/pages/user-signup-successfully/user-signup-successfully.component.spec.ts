import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupSuccessfullyComponent } from './user-signup-successfully.component';

describe('UserSignupSuccessfullyComponent', () => {
  let component: UserSignupSuccessfullyComponent;
  let fixture: ComponentFixture<UserSignupSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignupSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
