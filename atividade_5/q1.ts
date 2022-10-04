import {Conta, Banco}  from './banco_';

let banco: Banco = new Banco();
banco.inserir(new Conta('1', 200));
banco.inserir(new Conta('2', 400));
banco.inserir(new Conta('3', 70));

banco.inserir(new Conta('3', 10));


banco.depositar("3", 30);

banco.transferir('2', '1' , 150);

console.log(banco.consultar('1').saldo_conta);
console.log(banco.consultar('2').saldo_conta);
console.log(banco.consultar('3').saldo_conta);
console.log(banco.qtt_total_depositos());
console.log(banco.media_saldos());





/* 
200
400
100
700
233.33 */


