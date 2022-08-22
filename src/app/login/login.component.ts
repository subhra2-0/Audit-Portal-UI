import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export class UserCredentials{
  userId:string;
  password:string;
  constructor(id:string,pass:string)
  {
    this.userId=id;
    this.password=pass;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  invalidCredentials:boolean=false;
  userId:any="";
  password:any="";
  userCredentials!:UserCredentials;


  constructor(private service:BasicAuthenticationService,
    private route:Router) { }

  ngOnInit(): void {
  }
  handleJWTAuthentication()
  {
    this.userCredentials=new UserCredentials(this.userId,this.password);
    console.log(this.userCredentials);
    this.service.executeJWTAuthenticationService(this.userCredentials).subscribe(
      data=>{
        console.log(`in login component ${data.token}`);
        sessionStorage.setItem("loginstatus","success");
        sessionStorage.setItem("token",`${data.token}`);
        this.service.userLoggedIn=true;
        alert("Login Successfull.Welcome to Audit Management System");
        this.route.navigate(['home']);
      },
      error=>
      {
        this.invalidCredentials=true;
        console.log("wrong credentials");
        alert("Login failed. Enter valid credentails");
      }
    )
  

  }

}
