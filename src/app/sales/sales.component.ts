import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from '../item';
import { Sale } from '../sale';
import { AuthorizationService } from '../services/authorization.service';
import { ItemService } from '../services/item.service';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private auth:AuthorizationService,private items:ItemService,private sales:SaleService) { }

  saleList: Sale[] = null;
  list: Item[] = null;
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  itemSubscription: Subscription = null;
  paramSubscription: Subscription = null;
  saleSubject: BehaviorSubject<Sale[]> = new BehaviorSubject(null);
  saleSubscription: Subscription = null;
  lowerLimit: number = 0;
  upperLimit: number = 2;

  ngOnInit(): void {
    this.auth.loggedInCheck();
    this.itemSubject = this.items.itemSubject;
    this.itemSubscription = this.itemSubject
    .subscribe(res => {
      this.list = res;
    })
    this.saleSubject = this.sales.saleSubject;
    this.saleSubscription = this.saleSubject
    .subscribe(res =>{
      this.saleList = res;
    })
  }

  nextPage(){
    if(this.lowerLimit+2 < this.list.length){
      this.lowerLimit+=2;
      this.upperLimit+=2;
    }
  }

  previousPage(){
    if(this.lowerLimit-2 >= 0){
      this.lowerLimit-=2;
      this.upperLimit-=2;
    }
  }

  findSale(item:Item){
    if(this.saleList){
      let found = this.saleList.find(sale => sale.itemId = item._id);
      if(found){
        return (item.cost - (item.cost*(found.salePercent/100)));
      }
      else{
        return item.cost;
      }
    }
    else{
      return item.cost;
    }
  }

}
