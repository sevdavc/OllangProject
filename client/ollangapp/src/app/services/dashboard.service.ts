import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl:any=environment.baseURL;

  constructor(private http:HttpClient) { 
  }

  getUser(data:any){
    return this.http.post(this.baseUrl+"/clients/whoIam",data);
  }

  getWorks(data:any){
    
  }
}
