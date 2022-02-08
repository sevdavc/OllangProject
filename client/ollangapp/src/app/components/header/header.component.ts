import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;

  constructor(private dashserv:DashboardService) { }

  ngOnInit(): void {
    this.user=this.dashserv.getUser(localStorage.getItem("AccessToken")).subscribe((data)=>{
      this.user=data;
    });
  }

}
