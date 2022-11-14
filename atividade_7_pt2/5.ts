import { AplicacaoError} from "./1";

class ValorInvalido extends AplicacaoError{
    constructor(message:string) {
        super(message)
    }

}
class Conta {
    numero: string;
    saldo_conta : number;
    constructor(numero: string, saldo: number) {
        this.numero = numero;
        this.saldo_conta = saldo;
    }

/* ---------------------------------------------------- */
    private validarValor(valor:number):number{
        if(valor <= 0){
            throw new ValorInvalido("Valor invalido!"); 
        }else{
            return valor;
        }
    }

/* ---------------------------------------------------- */   
    sacar(valor: number): void {
        this.validarValor(valor)
            this.saldo_conta = this.saldo_conta - valor;
       
    }
/* -------------------------------------------------------- */
 
    depositar(valor: number): void {
        this.validarValor(valor)
            this.saldo_conta = this.saldo_conta + valor
        
    }

/* -------------------------------------------------------- */

    consultarSaldo(): number {
        return this.saldo_conta;
    }

    transferencia(contaDestino: Conta, valor: number) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }


    
}
