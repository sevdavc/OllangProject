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
  user:any;

  constructor(private fb:FormBuilder,private router:Router,private commserv:CommonService) { }

  ngOnInit(): void {
    //Identifying the form data 
    this.login=this.fb.group({
      email:["",Validators.compose([Validators.required,Validators.email])], //compose is for validating two different things
      password:["",Validators.required]
    })
  }

  //when we click to login button, logging the data of the form
  loginSubmit(data:any){
    if(data.email){
      this.commserv.getUser(data.email).subscribe((getdata:any)=>{
        if(getdata.length!==0){
          if(data.password === getdata[0].password){
            localStorage.setItem("IsLoggedIn","True");
            this.router.navigate(['home']);
          }
        }
      })
    }
  }

  gotoSignUp(){
    this.router.navigate(['register']); //when we click to the sign up button, it directs us to register page
  }
}
