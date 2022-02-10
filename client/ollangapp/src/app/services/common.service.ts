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

  sendJob(token:any,data:any){
    console.log(data);
    return this.http.post(this.baseUrl+"/jobs/"+token,data);
  }

  getfUser(data:any){
    return this.http.get(this.baseUrl+"/freelancers?filter[where][email]="+data)
  }

  getfPassword(data:any){
    return this.http.post(this.baseUrl+"/freelancers/password",data,{responseType: 'text'});
  }

  loginfService(data:any){
    return this.http.post(this.baseUrl+"/freelancers/login",data,{responseType: 'text'});
  }

  addfUser(data:any){
    return this.http.post(this.baseUrl+"/freelancers",data);
  }
}
