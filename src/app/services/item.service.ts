import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item';
import { ItemDataService } from './itemdata.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Item[] = null;
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  constructor(private itemDataService: ItemDataService) {
    this.setItems();
   }

   setItems(){
    this.itemDataService.getItems()
    .subscribe(res =>{
      this.items = res;
      this.itemSubject.next([...this.items]);
    })
   }

   addItem(item:Item){
     this.itemDataService.addItem(item)
     .subscribe(res => {
       item._id = res['name'];
       this.items.push(item);
       this.itemSubject.next([...this.items])
     })
   }

   deleteItem(item:Item){
     this.itemDataService.deleteItem(item)
     .subscribe(res => {
       this.items.splice(
         this.items.findIndex(listItem => listItem == item),1
        );
        this.itemSubject.next([...this.items]);
     })
   }

   editItem(item:Item){
     this.itemDataService.editItem(item)
     .subscribe(res => {
      this.items[this.items.findIndex(listItem => listItem._id == item._id)] = item;
      this.itemSubject.next([...this.items])
     });
   }

   getItemById(id:string){
    this.setItems();
    return this.items.find(item => item._id == id);
   }
}
