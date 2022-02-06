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
    console.log(this.baseUrl+"/clients?filter[where][email]="+data)
    return this.http.get(this.baseUrl+"/clients?filter[where][email]="+data)
  }

  addUser(data:any){
    return this.http.post(this.baseUrl+"/clients",data);
  }
}
