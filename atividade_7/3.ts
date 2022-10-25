 class Calculadora{
      op1: number;
      op2: number;

    constructor( op1: number,  op2: number){
            this.op1 = op1;
            this.op2 = op2;
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

class CalculadoraCientifica extends Calculadora{

    constructor(op1: number,  op2: number){
        super(op1,op2);
    }

    exponeciar():number{
        let valor = this.op1
        for(let i = 0 ; i< this.op2; i++){
            valor *= this.op1

        }
         return valor;
          
    }


}

let nova_operacao: CalculadoraCientifica = new CalculadoraCientifica(2,3);
console.log(nova_operacao.exponeciar())

