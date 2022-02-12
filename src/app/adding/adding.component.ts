import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from '../item';
import { Order } from '../order';
import { Sale } from '../sale';
import { AuthorizationService } from '../services/authorization.service';
import { ItemService } from '../services/item.service';
import { OrderService } from '../services/order.service';
import { SaleService } from '../services/sale.service';
import { User } from '../user';

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})
export class AddingComponent implements OnInit, OnDestroy {

  itemList: Item[] = null;
  saleList: Sale[] = null;
  orderList: Order[] = null;
  user: User = null;

  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject([]);
  saleSubject: BehaviorSubject<Sale[]> = new BehaviorSubject([]);
  orderSubject: BehaviorSubject<Order[]> = new BehaviorSubject([]);

  itemSubscription: Subscription = null;
  saleSubscription: Subscription = null;
  orderSubscription: Subscription = null;

  category: string = null;
  lowerLimit: number = 0;
  upperLimit: number = 1;

  editingID = '';
  newItemParam:Item;
  newSaleParam:Sale;
  editedItem: Item = null;
  editedSale: Sale = null;

  constructor(private auth:AuthorizationService,private items:ItemService,private sales:SaleService,private orders:OrderService) { }

  ngOnInit(): void {
    this.auth.loggedInCheck();
    this.itemSubject = this.items.itemSubject;
    if(JSON.parse(sessionStorage.getItem('user'))){
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    if(this.user.razina < 1){
      this.auth.logout();
    }
    this.itemSubscription = this.itemSubject
    .subscribe(res => {
      let filtered = res.filter(item => item.sellerId == this.user._id);
      if(filtered){
        this.itemList = filtered;
      }
    })
    this.saleSubject  = this.sales.saleSubject;
    this.saleSubscription = this.saleSubject
    .subscribe(res => {
      this.saleList = res;
    })
    this.orderSubject = this.orders.orderSubject;
    this.orderSubscription = this.orderSubject
    .subscribe(res => {
      this.orderList = res;
    })
    this.newItemParam = new Item('','',1,'','',false,1,'');
    this.newSaleParam = new Sale('',1);
  }

  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
    this.saleSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

  nextPage(){
    if(this.lowerLimit+1 < this.itemList.length){
      this.lowerLimit+=1;
      this.upperLimit+=1;
    }
  }

  previousPage(){
    if(this.lowerLimit-1 >= 0){
      this.lowerLimit-=1;
      this.upperLimit-=1;
    }
  }

  edit(item:Item){
    this.editingID = item._id;
    this.editedItem = {...item};
    if(this.saleItem(item._id)){
      this.editedSale = this.saleItem(item._id);
    }
  }

  finishEditing(item:Item){
    this.editingID = '';
    if(!this.editedItem.sale){
      this.sales.deleteItem(this.editedSale);
    }
    this.items.editItem(this.editedItem);
    this.editedItem = null;
    this.editedSale = null;
  }

  salePercent(id:string){
    let item = this.saleList.find(item => item.itemId == id);
    if(item){
      return item.salePercent;
    }
    else{
      return 0;
    }
  }

  saleItem(id:string){
    let item = this.saleList.find(item => item.itemId == id);
    return item;
  }

  itemOnSale(cost:number,salePercent:number){
    return cost - (cost*(salePercent/100));
  }

  removeItem(item:Item){
    this.items.deleteItem(item);
    if(this.saleItem(item._id)){
      this.sales.deleteItem(this.saleItem(item._id));
    }
    let orderToRemove = this.orderList.find(order => order.itemID == item._id);
    if(orderToRemove){
      this.orders.deleteOrder(orderToRemove);
    }
  }

  addItem(){
    this.newItemParam.sellerId = this.user._id;
    let newItem = new Item(this.newItemParam.name,this.newItemParam.image,this.newItemParam.cost,this.newItemParam.category,this.newItemParam.sellerId,this.newItemParam.sale,this.newItemParam.amount,this.newItemParam.description);
    this.items.addItem(newItem);
  }

  addSale(itemId:string){
    this.newSaleParam.itemId = itemId;
    this.sales.addItem(this.newSaleParam);
  }

}
