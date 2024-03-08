import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../common/email';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
private emailUrl = 'http://localhost:8080/sendMail';

constructor(private httpClient: HttpClient) { }
sendEmail(em:Email): Observable<any>{

  return this.httpClient.post(this.emailUrl, em,{responseType: 'text'});
  
}
  

constructEmail(name:string, num:string,em:string,msg:string, subject:string):Email{
  let email = new Email();
  
 email.recipient= 'djbond30@hotmail.com';
 email.message= `Contact Name: ${name}
 Contact Number: ${num}
 Contact Email: ${em}
 Message:
  ${msg}`;
 email.subject=subject;
 console.log(email);
 return email;
  }
}