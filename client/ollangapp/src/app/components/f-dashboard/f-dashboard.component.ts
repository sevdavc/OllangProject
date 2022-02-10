import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-f-dashboard',
  templateUrl: './f-dashboard.component.html',
  styleUrls: ['./f-dashboard.component.css']
})
export class FDashboardComponent implements OnInit {
  jobs:any;
  clicked:any;
  ticket:any = FormGroup;
  itemid:any;

  constructor(private fb:FormBuilder,private router:Router,private dashserv:DashboardService) { }

  ngOnInit(): void {
    this.dashserv.getTrueJobs(localStorage.getItem("AccessToken")).subscribe((data)=>{
      this.jobs=data;
    })

    this.ticket=this.fb.group({
      price:["",Validators.required],
      description:["",Validators.required]//compose is for validating two different things
    })
  }

  createTicket(data:any){
    this.clicked=true;
    this.itemid=data;
  }

  sendTicket(data:any){
    const newData={
      price:data.price,
      description:data.description,
      jobId:this.itemid,
      freelancerId:localStorage.getItem("AccessToken")
    }
    this.clicked=false;
    this.dashserv.sendTicket(newData).subscribe((get)=>{
      console.log(get);
    })
  }

}
