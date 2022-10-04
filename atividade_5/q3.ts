let input = require('prompt-sync')();
import { Conta, Banco } from "./banco_";

let b: Banco = new Banco();
let opcao: String = '';

do{
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
        '4 - Depositar 5- Transferir   \n' +
        '6 – Totalizações' +
        '0 - Sair\n');
    opcao = input("Opção:");
    switch (opcao) {
        case "1":
            inserir();
            break
        case "2":
            consultar();
            break
        case '3':
            sacar()
            break
        case '4':
            depositar()
            break
        case '5':
            transferir()
            break
        case '6':
            totalizacoes()
            break
        
    }



input("Operação finalizada. Digite <enter>");

}while (opcao != "0")
console.log("Aplicação encerrada")
 

function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta:');
    let conta: Conta;
    conta = new Conta(numero, 0);
    b.inserir(conta);
}

function consultar(): void {
    console.log("\nConsultar Conta\n");
    let n_conta: string = input("Digite o número da conta: ");
    console.log(b.consultar(n_conta));

}

function sacar(): void{
    let n_conta: string = input("Digite o número da conta: ");
    let valor_Saque : number = Number(input('Valor que deseja sacar: '));
    b.sacar(n_conta,valor_Saque);
}

function depositar(): void{
    let n_conta: string = input('Digite o numero da conta: ');
    let valor_deposito: number = Number(input('Valor que deseja depositar: '));
    b.depositar(n_conta, valor_deposito);
}

function transferir(): void{
    let n_conta1: string = input('Digite o numero da conta que vai transferir: ');
    let n_conta2: string = input('Digite o numero da conta destino: ');
    let valor_T: number = Number(input('Valor que deseja transferir: '));
    b.transferir(n_conta2, n_conta1, valor_T);
}

function totalizacoes(): void{
    console.log(b.qtt_total_depositos());
}
