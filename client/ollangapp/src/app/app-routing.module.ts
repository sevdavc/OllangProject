import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [{path:"login", component:LoginComponent},
{path:"register",component:RegisterComponent},{path:"home",component:DashboardComponent,canActivate:[AuthGuard]},{path:"",redirectTo:"login",pathMatch:"full"},{path:"profile",component:ProfileComponent}];
//canActivate:[AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
