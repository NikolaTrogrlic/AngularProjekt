import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemDataService } from './itemdata.service';
import { Sale } from '../sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  sales: Sale[] = null;
  saleSubject: BehaviorSubject<Sale[]> = new BehaviorSubject([]);

  constructor(private itemDataService: ItemDataService) {
    this.setSales();
  }

  setSales(){
    this.itemDataService.getSales()
    .subscribe(res =>{
      this.sales = res;
      this.saleSubject.next([...this.sales]);
    })
   }

   addItem(sale:Sale){
     this.itemDataService.addSale(sale)
     .subscribe(res => {
       sale._id = res['name'];
       this.sales.push(sale);
       this.saleSubject.next([...this.sales])
     })
   }

   deleteItem(sale:Sale){
     if(sale){
      this.itemDataService.deleteSale(sale)
      .subscribe(res => {
        this.sales.splice(
          this.sales.findIndex(listItem => listItem == sale),1
          );
          this.saleSubject.next([...this.sales]);
      })
    }
   }
}
