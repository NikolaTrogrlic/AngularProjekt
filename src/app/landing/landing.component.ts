import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { Item } from '../item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  list: Item[] = null;
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  itemSubscription: Subscription = null;

  constructor(private auth:AuthorizationService,private items:ItemService) { }

  ngOnInit(): void {
    this.auth.loggedInCheck();
    this.itemSubject = this.items.itemSubject;
    this.itemSubscription = this.itemSubject
    .subscribe(res => {
      this.list = res;
    })
  }

}
