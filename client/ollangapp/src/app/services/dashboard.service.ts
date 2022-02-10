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

  getJobs(data:any){
    return this.http.get(this.baseUrl+"/jobs/client/"+data);
  }

  getTickets(data:any){
    return this.http.get(this.baseUrl+"/tickets/jobs/"+data);
  }

  getTrueJobs(data:any){
    return this.http.get(this.baseUrl+"/jobs/freelancer");
  }

  getfUser(data:any){
    return this.http.post(this.baseUrl+"/freelancers/whoIam",data);
  }

  sendTicket(data:any){
    return this.http.post(this.baseUrl+"/tickets",data);
  }

  stateFalse(id:any,data:any){
    return this.http.patch(this.baseUrl+"/jobs/"+id,data);
  }
}
