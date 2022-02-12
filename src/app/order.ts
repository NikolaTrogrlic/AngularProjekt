export class Order {
    amount:number;
    itemID:string;
    boughtOnSale:boolean;
    price:number;
    username:string;
    address:string;
    date:Date;
    _id?:number;

    constructor(amount:number,itemID:string,username:string,address:string,boughtOnSale:boolean,price:number){
        this.amount = amount;
        this.itemID = itemID;
        this.username = username;
        this.address = address;
        this.boughtOnSale = boughtOnSale;
        this.price = price;
        this.date = new Date();
    }
}
