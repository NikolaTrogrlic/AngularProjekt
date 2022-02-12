export class Sale {
    itemId:string;
    salePercent:number;
    _id?:string;

    constructor(itemId:string,salePercent:number){
        this.itemId = itemId;
        this.salePercent = salePercent;
    }
}
