import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;

  constructor(private dashserv:DashboardService,private router:Router) { }

  ngOnInit(): void {
    this.user=this.dashserv.getUser(localStorage.getItem("AccessToken")).subscribe((data)=>{
      this.user=data;
    });
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  logout(){
    localStorage.clear();
  }

}
