import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from '../item';
import { Order } from '../order';
import { AuthorizationService } from '../services/authorization.service';
import { ItemService } from '../services/item.service';
import { OrderService } from '../services/order.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  id:string;
  user:User = null;
  itemList:Item[] = null;
  orderList:Order[] = null;
  

  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  orderSubject: BehaviorSubject<Order[]> = new BehaviorSubject(null);

  itemSubscription: Subscription = null;
  paramSubscription: Subscription = null;
  userSubscription: Subscription = null;
  orderSubscription: Subscription = null;

  constructor(private auth:AuthorizationService,private items:ItemService,private orders:OrderService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user = new User('Učitavanje...','','error','error','error','error',0);
    this.auth.loggedInCheck();
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.id= params.get('id');
    });
    this.userSubscription = this.auth.findUserById(this.id)
    .subscribe(res => {
      if(res){
        this.user = res;
      }
    })
    this.itemSubject = this.items.itemSubject;
    this.itemSubscription= this.itemSubject
    .subscribe(res => {
      let filtered = res.filter(item => item.sellerId == this.id);
      if(filtered){
        this.itemList = filtered;
      }
    })
    this.orderSubject = this.orders.orderSubject;
    this.orderSubscription = this.orderSubject
    .subscribe(res => {
      let filtered = res.filter(order => order.username == JSON.parse(sessionStorage.getItem('user')).username);
      if(filtered){
        this.orderList = filtered;
      }
    })
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

  sameAsLogged(userId:string){
    if(JSON.parse(sessionStorage.getItem('user'))){
      let user = JSON.parse(sessionStorage.getItem('user'));
      if(user._id == userId){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  istina(bool:boolean){
    if(bool){
      return 'Da'
    }
    else{
      return 'Ne'
    }
  }
  
  deleteOrder(order:Order){
    this.orders.deleteOrder(order);
  }

}
