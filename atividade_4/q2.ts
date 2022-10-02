class Hotel {
    quantReservas : number;
    adicionarReserva() : void {
    this.quantReservas++;
    }

    constructor( quantReservas: number ){
        this.quantReservas = quantReservas;
    }
    }


function main(){
let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
}