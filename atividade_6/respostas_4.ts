import { Conta, Banco } from "./3";

let conta1 = new Conta('1', 1000);
let conta2 = new Conta('2', 1500);
let conta3 = new Conta('3', 200);

let banco = new Banco();

banco.inserir(conta1);
banco.inserir(conta2);
banco.inserir(conta3);

banco.depositar('1', 1500);

console.log(banco.consultar('1'));
console.log(banco.media_saldos());
console.log(banco.qtt_contas());
console.log(banco.qtt_total_depositos());

banco.sacar('1', 500);

banco.transferir('3', '2', 600);

console.log(banco.consultar('1'));
console.log(banco.consultar('2'));
console.log(banco.consultar('3'));
