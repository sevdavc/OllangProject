import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreatejobComponent } from './components/createjob/createjob.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FDashboardComponent } from './components/f-dashboard/f-dashboard.component';
import { FLoginComponent } from './components/f-login/f-login.component';
import { FRegisterComponent } from './components/f-register/f-register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
{path:"client-login", component:LoginComponent},
{path:"client-register",component:RegisterComponent},
{path:"chome",component:DashboardComponent,canActivate:[AuthGuard]},
{path:"",redirectTo:"client-login",pathMatch:"full"},
{path:"profile",component:ProfileComponent},
{path:"createjob",component:CreatejobComponent},
{path:"freelancer-login",component:FLoginComponent},
{path:"freelancer-register",component:FRegisterComponent},
{path:"fhome",component:FDashboardComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
