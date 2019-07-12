import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Device } from '@ionic-native/device/ngx';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://mixproadvance.ddns.net/mbsmobile/mbsmobile.asmx/";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  public ReceiveUser:string="MdEsjk5d2P"
  public ReceivePassWord:string="Fs8SawmkSJ"
  
  UUid :string="259979739d8442a0"
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.'+ error.error);
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private device: Device, private http: HttpClient) {
   // this.UUid = this.device.uuid
   }

  
  checkregister(UUid:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
 
    const url = apiUrl +'CheckRegisterNo?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

ActiveRegister
  GetCustomerName(CustomerCode: string): Observable<any> {
   
 
    const url = apiUrl+'GetCustomerName?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   GetRegister(CustomerCode: string): Observable<any> {
   
 
    const url = apiUrl+'GetRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&RegisterNo='+ this.UUid 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   AddRegister(CustomerCode: string,FirstName:string,LastName:string,Email:string,Mobile:string): Observable<any> {
   
 
    const url = apiUrl+'AddRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&FirstName='+ FirstName +'&LastName='+ LastName +
                   '&Email='+ Email + '&Mobile=' + Mobile +'&RegisterNo='+ this.UUid 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }
   ActiveRegister1(CustomerCode: string,ReferenceCode:string,UserName:string,password:string): Observable<any> {
   
 
    const url = apiUrl+'ActiveRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&ReferenceCode='+ ReferenceCode +'&UserName='+ UserName +
                   '&password='+ password  +'&RegisterNo='+ this.UUid 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   
   getLoginpin(pin: string): Observable<any> {
   
 
    const url = apiUrl+'GetUserFromPasscode?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid +'&Passcode='+pin
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   getMemberById(Id: string): Observable<any> {

   const url =apiUrl + 'GetMemberById?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid +'&PersonId='+ Id
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   getLoanById(Id: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetLoanById?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid  +'&PersonId='+ Id
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   getSumAll(UserId: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    
    const url =apiUrl + 'GetSumAll?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' + this.UUid +'&UserId='+ UserId
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   getSumAllList(UserId: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetSumAllList?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid  +'&UserId='+ UserId
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   InsertloanTrans(AccountNo: string,Amount:string,user:string,AccountName:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'InsertLoanTrans?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid  +'&AccountNo='+ AccountNo+ '&AccountName='+AccountName +'&Amount='+Amount+'&UserId='+user
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   
   InsertRegister(AccountNo: string,Amount:string,user:string,AccountName:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'InsertLoanTrans?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.UUid +'&AccountNo='+ AccountNo+ '&AccountName='+AccountName +'&Amount='+Amount+'&UserId='+user
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

}
