import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { Item } from '../item';
import { ItemService } from '../services/item.service';
import { Sale } from '../sale';
import { SaleService } from '../services/sale.service';
import { User } from '../user';
import { Order } from '../order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnDestroy {

  item: Item = null;
  saleList: Sale[] = null;
  seller: User = null;
  sale:Sale = null;
  saleSubject: BehaviorSubject<Sale[]> = new BehaviorSubject(null);
  saleSubscription: Subscription = null;
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  itemSubscription: Subscription = null;
  sellerSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  sellerSubscription: Subscription = null;
  paramSubscription: Subscription = null;

  id: string = null;

  buyMenu:boolean = false;
  buyingAmount:number = 1;
  toAdress:string = '';


  constructor(private auth:AuthorizationService,private items:ItemService,private sales:SaleService,private route:ActivatedRoute,private orders:OrderService) { }

  ngOnInit(): void {
    this.item = new Item("Predmet nije pronađen","https://image.flaticon.com/icons/png/512/868/868690.png",0,"X","X",false,2,"Predmet ne postoji");
    this.sale = new Sale("X",0);
    this.seller = new User('error','error','error','error','error','error',0);

    this.auth.loggedInCheck();
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.id= params.get('id');
    });
    this.saleSubject = this.sales.saleSubject;
    this.saleSubscription = this.saleSubject
    .subscribe(res =>{
      let sale = res.find(item => item.itemId == this.id);
      if(sale){
        this.sale = res.find(item => item.itemId == this.id);
      } 
    })
    this.itemSubject = this.items.itemSubject;
    this.itemSubscription = this.itemSubject
    .subscribe(res => {
      let item = res.find(listItem => listItem._id == this.id);
      if(item){
        this.item = item;
        this.sellerSubscription = this.auth.findUserById(item.sellerId)
        .subscribe(res =>{
          if(res){
            this.seller = res;
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
      this.paramSubscription.unsubscribe();
      this.saleSubscription.unsubscribe();
      this.itemSubscription.unsubscribe();
      this.sellerSubscription.unsubscribe();
  }

  itemOnSale(cost:number,salePercent:number){
    return cost - (cost*(salePercent/100));
  }

  buyItem(item:Item,salePercent:number = 0){
    if(this.buyingAmount <= item.amount && this.buyingAmount > 0){
      if(this.toAdress != ''){
        if(JSON.parse(sessionStorage.getItem('user'))){
          let user = JSON.parse(sessionStorage.getItem('user'));
          let cost= item.cost;
          if(salePercent > 0){
            cost= cost - (cost*(salePercent/100));
          }
          let order = new Order(this.buyingAmount,item._id,user.username,this.toAdress,item.sale,cost);
          this.orders.addOrder(order);
          let newItem = item;
          newItem.amount--;
          this.items.editItem(newItem);
          this.buyMenu = false;
        }
      }
    }
  }

}
