import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuditType, QuestionEntity } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CheckListQuestionsService {
  tokenString:any;


  constructor(private http:HttpClient) { }
  
  executeCheckListQuestions2(auditType:AuditType)
   {
     let tokenStr=`Bearer ${sessionStorage.getItem("token")}`;
     const headers:HttpHeaders=new HttpHeaders().set('Authorization',tokenStr);
     return this.http.post<QuestionEntity[]>(`http://localhost:9091/api/portal/AuditCheckListQuestions/`,auditType,{headers:headers});
   }

}
