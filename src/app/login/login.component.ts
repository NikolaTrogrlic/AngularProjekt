import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  neispravno: boolean = false;
  validityMessage = "";
  
  constructor(private fb:FormBuilder,private router:Router,private auth:AuthorizationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }

  onSubmit(){
    this.auth.login(
      this.loginForm.value['username'],
      this.loginForm.value['password']);
  }

  checkState(){
    if(this.auth.authState == 'failure'){

      this.validityMessage = "Neispravni podatci";
      return true;
    }
    else if(this.auth.authState == 'sucess'){
      this.validityMessage = "Uspješno ste se registrirali.";
      return true;
    }
    else{
      this.validityMessage = "";
      return false;
    }
  }

}
