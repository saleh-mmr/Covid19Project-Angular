import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {PeopleComponent} from '../people/people.component';
import {NewreportComponent} from '../newreport/newreport.component';
import {RecentreportComponent} from '../recentreport/recentreport.component';
import {ProfileComponent} from './profile.component';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {EditprofileComponent} from '../editprofile/editprofile.component';
import {EditreportComponent} from '../editreport/editreport.component';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {AddConnectionComponent} from '../add-connection/add-connection.component';

@NgModule({
  declarations: [
    ProfileComponent,
    PeopleComponent,
    NewreportComponent,
    RecentreportComponent,
    EditprofileComponent,
    EditreportComponent,
    AddConnectionComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule
  ]
})
export class ProfileModule { }
