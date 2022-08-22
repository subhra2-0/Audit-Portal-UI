import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { QuestionsComponent } from './questions/questions.component';
import { StatusComponent } from './status/status.component';
import { ErrorComponent } from './error/error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { AuthGuard } from './auth/auth.guard';
import { TokenexpireComponent } from './tokenexpire/tokenexpire.component';
export class UserCredentials
{
  constructor(userId:string,password:string)
  {
    
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    LogoutComponent,
    QuestionsComponent,
    StatusComponent,
    ErrorComponent,
    TokenexpireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BackButtonDisableModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
