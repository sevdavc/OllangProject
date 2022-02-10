import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  constructor(private dashserv:DashboardService) { }

  ngOnInit(): void {
    //Getting the users information
    this.user=this.dashserv.getUser(localStorage.getItem("AccessToken")).subscribe((data)=>{
      this.user=data;
    });
    
  }

}
