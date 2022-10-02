class Conta {
    numero: string;
    saldo: number;

    constructor(numero: string, saldo: number) { 
        this.numero = numero;
        this.saldo = saldo;

    } 

    sacar(valor:number): boolean{
        if(this.saldo - valor < 0){
            console.log("Operação inválida!");
            return false
        }else{
            this.saldo = this.saldo - valor;
            return true
        }
    }


    depositar(valor: number):void{
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }


    transferir(ContaDestino: Conta, valor: number): boolean{
        
        if(this.sacar(valor)){
            this.sacar(valor);
            ContaDestino.depositar(valor);
            return true;
        }else {
            console.log("Operação inválida!");
            return false;
        }

    }
}


function main(): void{
    let conta1 : Conta = new Conta('Maria', 1000);
    let conta2 : Conta = new Conta('Viória', 400);


    console.log(conta1.sacar(10)) 
    conta2.transferir(conta1, 20)
    console.log(conta1.sacar(500))

}
main()