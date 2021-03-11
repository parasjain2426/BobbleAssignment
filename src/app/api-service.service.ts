import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  public postSignUpForm(email:string,password:string){
    return this.http.post<any>("https://reqres.in/api/register",
    {
      "email": email,
      "password": password
    });
  }
}
