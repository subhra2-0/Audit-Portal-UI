import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditType, QuestionEntity } from '../home/home.component';

import { AuditResponseService } from '../service/audit-response.service';
import { QuestionsDataService } from '../service/questions-data.service';

export class AuditDetail
{
  auditType!:string;
  
}
//AuditDetail class
export class AuditDetails
{
  question(question: any) {
    throw new Error('Method not implemented.');
  }
  auditType!:string;
  auditDate!:Date;
  auditQuestions!:QuestionEntity[];
  constructor(aType:string,aDate:Date,aQuestions:QuestionEntity[],
    )
  {
    this.auditType=aType;
    this.auditDate=aDate;
    this.auditQuestions=aQuestions;
  }
}
//AuditRequestClass
export class AuditRequest{
  projectName:string;
  projectManagerName:string;
  applicationOwnerName:string;
  auditDetails:AuditDetails;
  constructor(projectName:string,projectManagerName:string,applicationOwnerName:string,auditDetail:AuditDetails)
  {
    this.projectName=projectName;
    this.projectManagerName=projectManagerName;
    this.applicationOwnerName=applicationOwnerName;
    this.auditDetails=auditDetail;
  }
}
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  auditType!:AuditType;
  questionsData!:QuestionEntity[];
  question!:AuditDetails;
  myObject!: any;
  auditDetails!: AuditDetails;
  auditRequest!: AuditRequest;
  isNotValid:boolean=false;
  constructor(private questionService:QuestionsDataService,
    private responseService:AuditResponseService,
    
    private route:Router) { }

  ngOnInit(): void {
  
    this.myObject=localStorage.getItem("auditType");
    let obj=JSON.parse(this.myObject);
    this.auditType=obj;
   let auditQuestions:any=localStorage.getItem("auditQuestions");
   let objQuestions=JSON.parse(auditQuestions);
   this.questionsData=objQuestions;

    console.log(obj.auditType);
    console.log(this.auditType.auditType);
    console.log(this.questionsData[0]);
    console.log(this.questionsData[1]);
    console.log(this.questionsData[2]);
    console.log(this.questionsData[3]);
    console.log(this.questionsData[4]);
      }
  showResponse()
  {
    
   if(((this.questionsData[0].response=='Yes') || (this.questionsData[0].response=='No')) && ((this.questionsData[1].response=='Yes') || (this.questionsData[1].response=='No')) && ((this.questionsData[3].response=='Yes') || (this.questionsData[3].response=='No')) && ((this.questionsData[2].response=='Yes') || (this.questionsData[2].response=='No')) && ((this.questionsData[4].response=='Yes') || (this.questionsData[4].response=='No'))){
    let projectManagerName:string=JSON.stringify(localStorage.getItem("projectManagerName"));
    let applicationOwnerName:string=JSON.stringify(localStorage.getItem("applicationOwner"));
    let projectName:string=JSON.stringify(localStorage.getItem("projectName"));
    var date=new Date();
    this.auditDetails=new AuditDetails(this.auditType.auditType,date,this.questionsData);
    this.auditRequest=new AuditRequest(projectName,projectManagerName,applicationOwnerName,this.auditDetails);

    console.log(this.auditRequest);
    alert("Responses to each question submitted successfully");
    this.responseService.getAuditResponse(this.auditRequest).subscribe(
      data=>{
        console.log(data);
        localStorage.setItem("AuditResponse",JSON.stringify(data));
        this.route.navigate(['status']);
      },
      error=>
      {
      
        console.log("token expired");
        this.route.navigate(['tokenexpire'])
        alert("Token Expired.Login again");
      }
    );
  }
  else{
      this.isNotValid=true;
      
      this.route.navigate(['questions']);
      alert("Attempt all the questions.");
      
  }
}

}
