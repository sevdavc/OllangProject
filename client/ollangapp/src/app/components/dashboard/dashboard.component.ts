import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobs:any;
  tickets:any;
  constructor(private router:Router,private dashserv:DashboardService) { }

  ngOnInit(): void {
    this.dashserv.getJobs(localStorage.getItem("AccessToken")).subscribe((data)=>{
      this.jobs=data;
    })
  }

  //Route for creating a job
  goToCreateJob(){
    this.router.navigate(["createjob"])
  }

  //Getting the ticket list of the job
  goToTicket(data:any){
    this.dashserv.getTickets(data).subscribe((get)=>{
      this.tickets=get;
    })
  }

  //Accepting the ticket and giving the job to a freelancer
  acceptTicket(id:any){
    const data={
      freelancerId:localStorage.getItem("AccessToken")
    }
    this.dashserv.stateFalse(id,data).subscribe(()=>{
      window.location.reload();
    });

  }
}
