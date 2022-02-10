import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-f-login',
  templateUrl: './f-login.component.html',
  styleUrls: ['./f-login.component.css']
})
export class FLoginComponent implements OnInit {

  login:any = FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private commserv:CommonService) { }

  ngOnInit(): void {
    if(localStorage.getItem("AccessToken")){
      localStorage.clear();
    }
    this.login=this.fb.group({
      email:["",Validators.compose([Validators.required,Validators.email])],
      password:["",Validators.required]
    })
  }

  //Checking if the user is in the db
  loginSubmit(data:any){
    if(data.email && data.password){
      this.commserv.getfUser(data.email).subscribe((getdata:any)=>{
        if(getdata.length!==0){
          const newData={
            name:getdata[0].name,
            email:getdata[0].email,
            password:data.password,
            salt:getdata[0].salt
          }
          this.commserv.getfPassword(newData).subscribe((password)=>{
            if(password===getdata[0].password){
              const id={
                id:getdata[0].id
              }
              this.commserv.loginfService(id).subscribe((token)=>{
                localStorage.setItem("AccessToken",token);
                this.router.navigate(['fhome']);
              })
            }
          })
        }
      })
    }
  }

  gotoSignUp(){
    this.router.navigate(['freelancer-register']); //when we click to the sign up button, it directs us to register page
  }

  goToClientLogin(){
    this.router.navigate(['client-login']);
  }

}
