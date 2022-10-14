export  class Conta {
    private _numero: string;
    private _saldo_conta : number;

    constructor(numero: string, saldo: number) {
        this._numero = numero;
        this._saldo_conta = saldo;
    }
    
    get numero(){
        return this._numero;
    }

    get saldo_conta(){
        return this._saldo_conta;
    }

    sacar(valor: number): void {
        if(this._saldo_conta - valor >=0){
            this._saldo_conta = this._saldo_conta - valor;
        }else{
            console.log("Valor inválido");
        }
    }

    depositar(valor: number): void {
        this._saldo_conta = this._saldo_conta + valor;
    }

    consultarSaldo(): number {
        return this._saldo_conta;
    }

    transferencia(contaDestino: Conta, valor: number) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }


}


export class Banco {
    private contas: Conta[] = [];

    inserir(c : Conta): void {
        let nova_conta :  Conta = this.consultar(c.numero)

        if(nova_conta == null){
            this.contas.push(c);
        }else{
            console.log("Número de conta existente!");
            
        }

    }
    alterar(c : Conta): void {
        let indice =

        this.consultarIndice(c.numero);

        if (indice != -1) {
        this.contas[indice] = c;
    }
    }
    

    consultar(numero: String): Conta {
        let contaProcurada!: Conta;

        for (let c of this.contas) {
        if (c.numero == numero) {
            contaProcurada = c;
            break;
        }
        }
        return contaProcurada;
        }


    private consultarIndice(numero: String): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
            indice = i;
            break;
            }
        }
            return indice;
            }


    excluir(numero: String): void {
        let indice: number = this.consultarIndice(numero);
        if (indice != -1) {
        for (let i: number = indice; i < this.contas.length; i++) {
        this.contas[i] = this.contas[i + 1];
        }
        this.contas.pop();
        }
        }


    depositar(numero: String, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }    
    }


    sacar(numero: String, valor: number): boolean{
        let conta : Conta = this.consultar(numero);

        if(conta == null){
            console.log("Conta inexistente!");
            return false;
        }else{
            conta.sacar(valor);
            return true;
        }

    }
    

    transferir(numeroCredito: String,numeroDebito:String,valor: number): void {
        let conta1 : Conta = this.consultar(numeroCredito);
        let conta2 : Conta = this.consultar(numeroDebito);
    }
    
    
    qtt_contas():number{
        return this.contas.length;
    }

    qtt_total_depositos(): number{
        let soma = 0;

        for(let i = 0; i < this.contas.length; i++){
            soma += this.contas[i].saldo_conta;
        }

        return soma;
    }

    media_saldos(): string{
        return (this.qtt_total_depositos()/this.qtt_contas()).toFixed(2);
        
    }

}