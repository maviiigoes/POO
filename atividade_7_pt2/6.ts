 class PoupancaInvalidaError extends Error{
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

    depositar(valor: number): void {
        this.saldo_conta = this.saldo_conta + valor;
    }

    consultarSaldo(): number {
        return this.saldo_conta;
    }

    transferencia(contaDestino: Conta, valor: number) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}    

class Poupanca extends Conta{
    private _taxaJuros: number;
    
    constructor(numero: string, saldo_conta: number,
        taxaJuros: number ) {
        
        super(numero, saldo_conta);
        this._taxaJuros = taxaJuros;
    }

    renderJuros(): void {
        this.depositar(this.saldo_conta * this._taxaJuros/100);
    }

    get taxaJuros() {
        return this._taxaJuros
    }
}

export class Banco {
    contas: Conta[] = [];

    inserir(c : Conta): void {
        let nova_conta :  Conta = this.consultar(c.numero)

        if(nova_conta == null){
            this.contas.push(c);
        }else{
            throw new Error("Número de conta existente!");
            
        }

    }
    
    alterar(c : Conta): void {
        let indice = this.consultarIndice(c.numero);

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


    consultarIndice(numero: String): number {
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
            throw new Error("Conta inexistente!");
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
/* ------------------------------------------- */
    RenderJuros(numero:any):number{
        let conta = numero;
        if(this.consultar(conta)){
            if(conta instanceof Poupanca ){
                ((<Poupanca>conta).renderJuros)
                return conta.saldo_conta;
            }else{
                throw new PoupancaInvalidaError("Conta invalida!")
            }
        };
        return 0
    }        
}

/* ------------------------------------------- */

class ContaImposto extends Conta{
    constructor(numero: string, saldo_conta: number,){
        super(numero,saldo_conta)        
    }

    valorEmConta():number{
        let imposto = this.saldo_conta - (this.saldo_conta*0.0038);
        this.saldo_conta = imposto;
        return this.saldo_conta      
    }
}
