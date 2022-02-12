import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  validityMessage: string
  
  constructor(private fb:FormBuilder,private router:Router,private auth:AuthorizationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'username': new FormControl("", [Validators.required,Validators.minLength(4)]),
      'password': new FormControl("", Validators.required),
      'password2': new FormControl("", Validators.required),
      'email': new FormControl("",[Validators.required,Validators.email]),
      'ime': new FormControl('',Validators.required),
      'prezime': new FormControl('',Validators.required),
      'telephone': new FormControl('',[Validators.required,Validators.minLength(8)])
    });

    this.validityMessage = '';
  }

  onRegister(){
    if(this.registerForm.value['password'] == this.registerForm.value['password2']){
      this.auth.register(
        new User(this.registerForm.value['username'],
        this.registerForm.value['password'],
        this.registerForm.value['ime'],
        this.registerForm.value['prezime'],
        this.registerForm.value['telephone'],
        this.registerForm.value['email'],
        0)
      )
    }
  }

  formValid(){
    if(this.registerForm.controls['username'].invalid){
      this.validityMessage = "Korisničko ime treba imati barem 4 znaka i biti uneseno.";
      return false;
    }
    else if(this.registerForm.controls['password'].invalid || !(this.registerForm.value['password'] == this.registerForm.value['password2'])){
      this.validityMessage = "Lozinke trebaju biti unesene i podudarati se.";
      return false;
    }
    else if(this.registerForm.controls['email'].invalid){
      this.validityMessage = "Treba biti unesen ispravan mail.";
      return false;
    }
    else if(this.registerForm.controls['ime'].invalid || this.registerForm.controls['prezime'].invalid){
      this.validityMessage = "Nisu svi podatci uneseni.";
      return false;
    }
    else if(this.registerForm.controls['telephone'].invalid){
      this.validityMessage = "Neispravan broj telefona. Minimum 8 brojeva.";
      return false;
    }
    else if(this.auth.authState == 'failure'){
      this.validityMessage = 'To se korisničko ime već koristi.';
      return false;
    }
    this.validityMessage = "";
    console.log(this.auth.authState);
    return true;
  }

}
