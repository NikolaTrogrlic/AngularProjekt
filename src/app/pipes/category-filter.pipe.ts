import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: Item[], category?: string): Item[] {
    if(!value)return null;
    if(!category)return value;

    return value.filter(item => item['category'] == category);
  }

}
