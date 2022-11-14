export class AplicacaoError extends Error {
    constructor(message:string) {
        super(message)
    }

}


export class ContainexistenteError extends AplicacaoError{
    constructor(mensage:string){
        super(mensage)
    }
}



export class SaldoInsuficienteError extends AplicacaoError {
    constructor(message : string) {
        super(message);
    }   
}