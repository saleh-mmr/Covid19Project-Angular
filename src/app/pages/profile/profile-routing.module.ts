import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewreportComponent} from '../newreport/newreport.component';
import {RecentreportComponent} from '../recentreport/recentreport.component';
import {PeopleComponent} from '../people/people.component';
import {ProfileComponent} from './profile.component';
import {EditprofileComponent} from '../editprofile/editprofile.component';
import {EditreportComponent} from '../editreport/editreport.component';
import {AddConnectionComponent} from '../add-connection/add-connection.component';

const routes: Routes = [
  {path: '', component: ProfileComponent,
  children: [
  {path: 'new-report', component: NewreportComponent},
  {path: 'recent-reports', component: RecentreportComponent},
  {path: 'related-people', component: PeopleComponent},
  {path: 'edit-profile', component: EditprofileComponent},
  {path: 'edit-report/:id', component: EditreportComponent},
  {path: 'add-connection/:id', component: AddConnectionComponent}
  ]}
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
