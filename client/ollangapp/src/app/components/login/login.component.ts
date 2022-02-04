import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = FormGroup; //Data of the form

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    //Identifying the form data 
    this.login=this.fb.group({
      name:["",Validators.required],
      email:["",Validators.required]
    })
  }

  //when we click to login button, logging the data of the form
  loginSubmit(data:any){
    console.log(data);
  }

}
