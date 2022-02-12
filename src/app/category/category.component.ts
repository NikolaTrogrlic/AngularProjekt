import { LiteralPrimitive } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from '../item';
import { AuthorizationService } from '../services/authorization.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {

  list: Item[] = null;
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  itemSubscription: Subscription = null;
  paramSubscription: Subscription = null;
  category: string = null;
  lowerLimit: number = 0;
  upperLimit: number = 4;

  constructor(private auth:AuthorizationService,private items:ItemService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.loggedInCheck();
    this.itemSubject = this.items.itemSubject;
    this.itemSubscription = this.itemSubject
    .subscribe(res => {
      this.list = res;
    })
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.category= params.get('category');
    });
  }

  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  nextPage(){
    if(this.lowerLimit+4 < this.list.length){
      this.lowerLimit+=4;
      this.upperLimit+=4;
    }
  }

  previousPage(){
    if(this.lowerLimit-4 >= 0){
      this.lowerLimit-=4;
      this.upperLimit-=4;
    }
  }

}
