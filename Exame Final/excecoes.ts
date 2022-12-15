export class SoldadoEliminadoExepiton extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}



export class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}