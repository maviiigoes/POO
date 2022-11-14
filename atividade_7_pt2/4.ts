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

    
    sacar(valor: number): void {
        if(this.saldo_conta - valor >=0){
            this.saldo_conta = this.saldo_conta - valor;
        }else{
            console.log("Valor inválido");
        }
    }
/* -------------------------------------------------------- */
 
    depositar(valor: number): void {
        
        if(valor <= 0){
            throw new ValorInvalido("Valor invalido!");
        }else{
            this.saldo_conta = this.saldo_conta + valor
        }
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



