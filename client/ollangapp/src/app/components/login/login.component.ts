import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = FormGroup; //Data of the form
  users:any=[];

  constructor(private fb:FormBuilder,private router:Router,private commserv:CommonService) { }

  ngOnInit(): void {
    //Identifying the form data 
    this.login=this.fb.group({
      name:["",Validators.required],
      email:["",Validators.compose([Validators.required,Validators.email])] //compose is for validating two different things
    })
    this.commserv.getUser().subscribe((data:any)=>{
      this.users=data;
    })
  }

  //when we click to login button, logging the data of the form
  loginSubmit(data:any){
    if(data.name){
      this.users.forEach((item:any)=>{
        if(item.name===data.name && item.email===data.email){
          localStorage.setItem("IsLoggedIn","true");
          this.router.navigate(['home']);
        }
        else{
          localStorage.clear();
        }
      })
    }
  }

  gotoSignUp(){
    this.router.navigate(['register']); //when we click to the sign up button, it directs us to register page
  }
}
