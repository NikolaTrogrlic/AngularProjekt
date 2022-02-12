import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private auth:AuthorizationService,private router:Router) { }

  user(){
    return this.auth.fetchUser();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.auth.loggedInCheck();
  }

  isAuthenticated(){
    if(this.auth.fetchUser() != null){
      return true;
    }
    else{
      return false;
    }
  }

}
