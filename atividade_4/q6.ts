class Triangulo{
    lado1 : number;
    lado2 : number;
    lado3 : number;


    constructor(lado1:number,lado2:number,lado3:number){
    this.lado1 = lado1;
    this.lado2 = lado2;
    this.lado3 = lado3;

    }

    ehtriangulo(): boolean{
        return this.lado2 - this.lado3<this.lado1 && this.lado1<this.lado2 +this.lado3;

    }

    ehIsoceles(): boolean{
        return this.lado1 == this.lado2 || this.lado2 == this.lado3 || this.lado3 == this.lado1;

    }

    ehEquilatero(): boolean{
        return this.lado1 == this.lado2 && this.lado1 == this.lado3;

    }

    ehEscaleno():boolean{
        return this.lado1 !== this.lado2 && this.lado1 !== this.lado3 && this.lado3 !== this.lado2;
    }


}
function main(){
    let triangulo_equilatero : Triangulo = new Triangulo(5, 5, 5); 
    let triangulo_isoceles : Triangulo = new Triangulo(7, 6, 7);
    let triangulo_escaleno : Triangulo = new Triangulo(3, 4, 9);
    let eh_triangulo : Triangulo = new Triangulo(9,8,7);
    let eh_triangulo2 : Triangulo = new Triangulo(0,8,7);


    console.log(triangulo_isoceles.ehIsoceles())
    console.log(triangulo_equilatero.ehEquilatero())
    console.log(triangulo_escaleno.ehEscaleno())
    console.log(eh_triangulo.ehtriangulo())
    console.log(eh_triangulo2.ehtriangulo())
}
main()


/*
Resultado:
true
true
true
true
false

*/