import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../order';
import { ItemDataService } from './itemdata.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = null;
  orderSubject: BehaviorSubject<Order[]> = new BehaviorSubject([]);

  constructor(private itemDataService: ItemDataService) {
    this.setOrders();
  }

  setOrders(){
    this.itemDataService.getOrders()
    .subscribe(res =>{
      this.orders = res;
      this.orderSubject.next([...this.orders]);
    })
   }

   addOrder(order:Order){
     this.itemDataService.addOrders(order)
     .subscribe(res => {
       order._id = res['name'];
       this.orders.push(order);
       this.orderSubject.next([...this.orders]);
     })
   }

   deleteOrder(order:Order){
     this.itemDataService.deleteOrder(order)
     .subscribe(res => {
       this.orders.splice(
         this.orders.findIndex(listItem => listItem == order),1
        );
        this.orderSubject.next([...this.orders]);
     })
   }
}
