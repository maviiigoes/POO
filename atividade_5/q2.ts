class Postagem{
    id: number;
    texto: string;
    qtt_curtidas : number;

    constructor(id: number, texto: string ,qtt_curtidas : number){
        this.id = id;
        this.texto = texto;
        this.qtt_curtidas = qtt_curtidas;
    }

    curtir(): void{
        this.qtt_curtidas++;
    }

    toString(): string{
        return `Postagem : ${this.id}, texto postagem ${this.texto}, quantidade de curtidas: ${this.qtt_curtidas}.`;
    }

}

class Micriblog{
    postagens: Postagem[] = [];

    inserir_postagem(postagem: Postagem): void{
        this.postagens.push(postagem);
    }

    excluir_post(id:number): void{
        for(let i=0; i<this.postagens.length;i++){
            if(this.postagens[i].id == id){
                this.postagens.splice(i, 1);
                break;
            }
        }
    }

    mais_curtida(): Array<Postagem>{
        let postagem = this.postagens.reduce((postMaisCurtido, postAtual) => postAtual.qtt_curtidas > postMaisCurtido.qtt_curtidas ? postMaisCurtido = postAtual : postMaisCurtido = postMaisCurtido);
        return [postagem];

    }

    curtir(id: number): void{
        this.postagens[id].curtir();
    }


    toString(): string{
        let concatenacao = ''

        for(let i = 0; i<this.postagens.length; i++){
            concatenacao += this.postagens[i];
        }

        return concatenacao;
    }

    
    




}