import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {AuthGuard} from './helpers/auth.guard';
import {ProfileModule} from './pages/profile/profile.module';
import {UserComponent} from './pages/user/user.component';

const routers: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'profile', canActivate: [AuthGuard] ,
    loadChildren: () =>
      import('./pages/profile/profile.module').then(
        m => m.ProfileModule
      )
  },
  {path: '**', component: NotfoundComponent},
] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
