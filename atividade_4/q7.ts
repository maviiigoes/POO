class Equipamento{
    ligado : boolean;
    constructor(ligado: boolean) {
        this.ligado = ligado;
    }

    liga():void{
        if(!this.ligado){
            this.ligado = true;
        }

    }

    desliga():void{
        if(this.ligado){
            this.ligado = false;
        }

    }

    inverte(): void{
        if(!this.ligado){
            this.ligado = true;
        }else{
             this.ligado = false;
        }

    }

    estaLigado(): boolean {
        return this.ligado;
    }

}


function main(){
    let aparelho : Equipamento = new Equipamento(false);
    aparelho.liga();
    console.log(aparelho.estaLigado());
    aparelho.desliga();
    console.log(aparelho.estaLigado());
    aparelho.inverte();
    console.log(aparelho.estaLigado());

    
}
main()


/*
RESULTADO:
true
false
true
*/