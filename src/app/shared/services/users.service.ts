import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
@Injectable({  
  providedIn: 'root'  
})  
export class UserService  {
  
  public http: HttpClient;

  public url = 'http://localhost:65389/Api';  
  getAllUser(): Observable<any[]> {  
    return this.http.get<any[]>(this.url + '/AllUserDetails');  
  }  

  public getUserById(UserId: string): Observable<any> {  
    return this.http.get<any>(this.url + '/GetUserDetailsById/' + UserId);  
  }  

  public createUser(User: any): Observable<any> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<any>(this.url + '/Login/InsertUserDetails/',  
    User, httpOptions);  
  }  

  public updateUser(User: any): Observable<any> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<any>(this.url + '/UpdateUserDetails/',  
    User, httpOptions);  
  }  

 public deleteUserById(Userid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' +Userid,  
 httpOptions);  
  }  

  public login(User: any): Observable<any> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<any>(this.url +'/Login/ValidateUser/',  
    User, httpOptions);  
  } 

}
