import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})
export class CreatejobComponent implements OnInit {
  newjob:any;

  constructor(private fb:FormBuilder,private router:Router,private commserv:CommonService) { 
    this.newjob=this.fb.group({
      name:["",Validators.compose([Validators.required,Validators.email])], //compose is for validating two different things
      description:["",Validators.required]
    })
  }

  ngOnInit(): void {
  }

  //Sending the job to db
  jobSubmit(data:any){
    this.commserv.sendJob(localStorage.getItem("AccessToken"),data).subscribe((get)=>{
      this.router.navigate(['chome']);
    });
    
  }
}
