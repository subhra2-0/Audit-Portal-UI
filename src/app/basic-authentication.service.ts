import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from './login/login.component';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  userLoggedIn=false;
  constructor(private http:HttpClient) { }
  
 
  executeJWTAuthenticationService(userCredentials:UserCredentials)
  {
    return this.http.post<any>(`http://localhost:9091/api/portal/login`,userCredentials);
  }
  
}


