class Jogador{
    forca: number;
    nivel: number;
    pontos_atuais: number;

    constructor(forca: number, nivel: number, pontos_atuais: number){
        this.forca = forca;
        this.nivel = nivel;
        this.pontos_atuais = pontos_atuais;
    }

    calcularAtaque(): number{
        return this.forca * this.nivel;
    }

    atacar(jogador: Jogador):void{
        if(jogador.estaVivo()){
            jogador.pontos_atuais = jogador.pontos_atuais - this.calcularAtaque()

        }else{
            console.log("JOGADOR MORTO!")
        }

    }

    estaVivo(): boolean{
        return this.pontos_atuais > 0
    }


    toString(): string{
        return ` Força: ${this.forca}, Nível: ${this.nivel} e Pontos Atuais: ${this.pontos_atuais} `
    }
}

function main(): void {
    let jogador_1 : Jogador = new Jogador(20, 5, 200)
    let jogador_2 : Jogador = new Jogador(5, 2, 50)

    console.log(jogador_1.calcularAtaque())
    console.log(jogador_2.calcularAtaque())

    jogador_1.atacar(jogador_2)

    
    console.log(jogador_1.toString())
    console.log(jogador_2.toString())

}
main()