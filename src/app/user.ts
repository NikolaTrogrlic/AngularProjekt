export class User {
    username:string;
    password:string;
    ime:string;
    prezime:string;
    telefon:string;
    email:string;
    razina:number;
    _id?:string;

    constructor(username:string,password:string,ime:string,prezime:string,telefon:string,email:string,razina:number){
        this.username = username;
        this.password = password;
        this.ime = ime;
        this.prezime = prezime;
        this.telefon = telefon;
        this.email = email;
        this.razina = razina;
    }
}
