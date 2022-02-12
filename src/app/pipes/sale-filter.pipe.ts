import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';

@Pipe({
  name: 'saleFilter',
  pure: true
})
export class SaleFilterPipe implements PipeTransform {

  transform(value: Item[]): Item[] {
    if(!value)return null;

    return value.filter(item => item.sale == true);
  }

}
