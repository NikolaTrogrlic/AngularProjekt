import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Item } from '../item';
import { Order } from '../order';
import { Sale } from '../sale';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  constructor(private http:HttpClient) {
  }

  getItems(){
    /*Get request*/
    return this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/items.json')
    .pipe(map(res =>{
      let items = [];
      for(let key in res){
        items.push({...res[key], _id:key});
      }
      return items;
    }))
  }

  addItem(item:Item){
    return this.http.post('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/items.json',item);
  }

  deleteItem(item:Item){
    return this.http.delete(`https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/items/${item._id}.json`);
  }

  editItem(item:Item){
    return this.http.patch(`https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/items/${item._id}/.json`,item);
  }

  getSales(){
    return this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
    .pipe(map(res =>{
      let sales = [];
      for(let key in res){
        sales.push({...res[key], _id:key});
      }
      return sales;
    }))
  }

  addSale(sale:Sale){
    return this.http.post('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/sales.json',sale);
  }

  deleteSale(sale:Sale){
    return this.http.delete(`https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/sales/${sale._id}.json`);
  }

  getOrders(){
    return this.http.get('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
    .pipe(map(res =>{
      let items = [];
      for(let key in res){
        items.push({...res[key], _id:key});
      }
      return items;
    }))
  }

  addOrders(order:Order){
    return this.http.post('https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/orders.json',order);
  }

  deleteOrder(order:Order){
    return this.http.delete(`https://projektjavascript-f1289-default-rtdb.europe-west1.firebasedatabase.app/orders/${order._id}.json`);
  }


}
