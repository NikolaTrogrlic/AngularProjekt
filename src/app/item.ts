export class Item {

    name:string;
    image:string;
    cost:number;
    category:string;
    sellerId:string;
    sale:boolean;
    amount:number;
    description:string;
    _id?:string;

    constructor(name:string,image:string,cost:number,category:string,sellerId:string,sale:boolean,amount:number,description:string){
        this.name = name;
        this.image = image;
        this.cost = cost;
        this.category = category;
        this.sellerId = sellerId;
        this.sale = sale;
        this.amount = amount;
        this.description = description;
    }
}
