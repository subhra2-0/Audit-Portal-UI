import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { QuestionsComponent } from './questions/questions.component';
import { StatusComponent } from './status/status.component';
import { TokenexpireComponent } from './tokenexpire/tokenexpire.component';
import {AuthGuard} from './auth/auth.guard';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'logout',component:LogoutComponent,canActivate:[AuthGuard]},
  {path:'questions',component:QuestionsComponent,canActivate:[AuthGuard]},
  {path:'status',component:StatusComponent,canActivate:[AuthGuard]},
  {path:'error',component:ErrorComponent},
  {path:'tokenexpire',component:TokenexpireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
