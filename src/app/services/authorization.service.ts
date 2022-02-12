import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { map, Subject, Subscription } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  secretKey = "longKeyEncryption";
  user:User = null;
  authState = '';

  constructor(private http:HttpClient,private router:Router) { }

  login(username:string,password:string){
    this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .pipe(map(res => {
      let users = [];
      for(let key in res){
        users.push({...res[key], _id:key});
      }
      let user = users.find(user => user.username == username && this.decrypt(user.password) == password);
      return user;
    }))
    .subscribe(res => {
      if(res){
        this.user = res;
        sessionStorage.setItem('user',JSON.stringify(this.user));
        this.router.navigate(['']);
      }
      else{
        this.authState = 'failure';
      }
    });
  }

  logout(){
    this.authState = '';
    this.user = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  register(user:User){
    this.checkIfValid(user.username)
    .subscribe(res => {
      if(!res){
        user.password = this.encrypt(user.password);
        this.http.post('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/users.json',user).subscribe(res => {
          this.router.navigate(['/auth/login']);
        })
        this.authState = 'sucess';
      }
      else{
        this.authState = 'failure';
      }
    });
  }

  checkIfValid(username:string){
    return this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .pipe(map(res =>{
      let users = [];
      for(let key in res){
        users.push({...res[key], _id:key});
      }
      let user = users.find(user => user.username == username)
      return user;
    }))
  }

  loggedInCheck(){
    if(!JSON.parse(sessionStorage.getItem('user'))){
      this.router.navigate(['/auth/login']);
    }
  }

  fetchUser(){
    return JSON.parse(sessionStorage.getItem('user'));
  }

  findUserById(id:string){
    return this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .pipe(map(res => {
      let users = [];
      for(let key in res){
        users.push({...res[key], _id:key});
      }
      let user = users.find(user => user._id == id);
      return user;
    }))
  }

  encrypt(value:string){
    return crypto.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return crypto.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(crypto.enc.Utf8);
  }

}
