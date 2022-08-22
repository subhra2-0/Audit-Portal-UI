import { Component, OnInit } from '@angular/core';
import { CheckListQuestionsService } from '../service/check-list-questions.service';
import { Data, Router } from '@angular/router';

export class AuditType{
  auditType:string;
  constructor(aType:string)
  {
    this.auditType=aType;
  }
}
export class QuestionEntity
{
  questionId!:number;
  auditType!:string;
  question!:string;
  response!:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projectName:string='';
  projectMangerName:string='';
  applicationOwner:string='';
  aType:string='';
  auditType!:AuditType;

  questionEntity!:QuestionEntity[];
  isNotValid:boolean=false;
  isProjectNotValid:boolean=false;
  isManNotValid:boolean=false;
  isApptNotValid:boolean=false;
  isAuditNotValid:boolean=false;

  constructor(private checkListServive:CheckListQuestionsService,
    private router:Router) { }

  ngOnInit(): void {
   
  }
  
  getCheckListQuestions()
  {
    if(this.projectName.length<2 && this.applicationOwner.length<2 && this.projectMangerName.length<2 && (this.aType!='Internal'&&this.aType!='SOX'))
    {
      this.isNotValid=true;
      this.router.navigate(['home']);
    }
    else if(this.projectName.length<2){
      this.isProjectNotValid=true;
      this.router.navigate(['home']);
    }
    else if(this.projectMangerName.length<2){
      this.isManNotValid=true;
      this.router.navigate(['home']);
    }
    else if(this.applicationOwner.length<2){
      this.isApptNotValid=true;
      this.router.navigate(['home']);
    }
    else if((this.aType!='Internal'&&this.aType!='SOX')){
      this.isAuditNotValid=true;
      this.router.navigate(['home']);
    }
    else{
    this.auditType=new AuditType(this.aType);
    console.log(this.auditType);
    this.checkListServive.executeCheckListQuestions2(this.auditType).subscribe(
      data=>{
        console.log(data);
        this.questionEntity=data;
        this.router.navigate(['questions'])
        localStorage.setItem("auditType",JSON.stringify(this.auditType));
        localStorage.setItem("auditQuestions",JSON.stringify(data));
        localStorage.setItem("projectName",this.projectName);
        localStorage.setItem("projectManagerName",this.projectMangerName);
        localStorage.setItem("applicationOwner",this.applicationOwner);
      },
      error=>
      {
      
        console.log("token expired");
        this.router.navigate(['tokenexpire'])
        alert("Token Expired.Login again");
      }
    )
  }
}
}
