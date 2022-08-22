import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable ,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    if(this.isloggedIn()){
return of(true);
    }else{
alert("you don't have permission to access the page , please login...");
this.router.navigate(['error']);
return of(false);
    }
      
  }
  
  isloggedIn(){
    var data=sessionStorage.getItem("loginstatus");
    if(data==="success"){
      return true;
    }else{
      return false;
    }
  }
}
