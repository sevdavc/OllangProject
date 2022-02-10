import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-f-register',
  templateUrl: './f-register.component.html',
  styleUrls: ['./f-register.component.css']
})
export class FRegisterComponent implements OnInit {

  register:any = FormGroup;
  
  constructor(private fb:FormBuilder,private router:Router,private commServ:CommonService) { }

  ngOnInit(): void {
    if(localStorage.getItem("AccessToken")){
      localStorage.clear();
    }
    this.register=this.fb.group({
      name:["",Validators.required],
      email:["",Validators.compose([Validators.required,Validators.email])],//compose is for validating two different things
      password:["",Validators.required] 
    })
  }

  //Registering the user
  registerSubmit(data:any){
    let dataToPass={
      name:data.name,
      email:data.email,
      password:data.password
    }
    this.commServ.addfUser(dataToPass).subscribe((data:any)=>{
      this.router.navigate(['freelancer-login']);
    })
    
  }

  //Routing to freelancer-login
  gotoLogin(){
    this.router.navigate(['freelancer-login']);
  }
}
