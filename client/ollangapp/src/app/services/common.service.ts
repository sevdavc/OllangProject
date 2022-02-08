import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl:any=environment.baseURL;

  constructor(private http:HttpClient) { }

  getUser(data:any){
    return this.http.get(this.baseUrl+"/clients?filter[where][email]="+data)
  }

  addUser(data:any){
    return this.http.post(this.baseUrl+"/clients",data);
  }

  getPassword(data:any){
    return this.http.post(this.baseUrl+"/clients/password",data,{responseType: 'text'});
  }

  loginService(data:any){
    return this.http.post(this.baseUrl+"/clients/login",data,{responseType: 'text'});
  }

}
