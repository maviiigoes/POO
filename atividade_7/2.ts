class Calculadora{

    constructor( private op1: number,  private op2: number){
            this.op1 = op1;
            this.op2 = op2
    }

    soma():number{
        let resultado =0;
        resultado = this.op1 + this.op2;
        return resultado
    }

    subtracao(): number{
        let resultado =0;
        if(this.op1<this.op2){
            resultado = this.op2 - this.op1;
        }else{
            resultado = this.op1 - this.op2; 
        }
    return resultado;
    }


}   

 function main(){

let clacular = new Calculadora(1,4)


console.log(clacular.soma())

}
main()
 