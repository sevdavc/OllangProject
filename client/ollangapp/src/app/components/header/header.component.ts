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
    //Fetching the users name
    if(this.router.url==="/fhome"){
      this.dashserv.getfUser(localStorage.getItem("AccessToken")).subscribe((fdata)=>{
        this.user=fdata;
      })
    }
    else{
      this.dashserv.getUser(localStorage.getItem("AccessToken")).subscribe((data)=>{
        this.user=data;
      });
    }
    
  }

  //Routing to chome
  goToHome(){
    this.router.navigate(['chome']);
  }

  //Routing to profile
  goToProfile(){
    this.router.navigate(['profile']);
  }

  //Logout, clearing the access token from local storage
  logout(){
    localStorage.clear();
  }

}
