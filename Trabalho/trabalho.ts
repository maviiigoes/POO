import {  AlunoNaoEncontradoError, AlunoJaCadastradoError, id_userError } from "./exececoes";

class User {
    nome: string;
    id_user: number;
    login: string;
    senha: string;


    constructor(nome: string, id_user: number, login: string, senha: string) {

        this.id_user = id_user;
        this.login = login;
        this.nome = nome;
        this.senha = senha;
    }

}


interface IRepositoriaid_users{
    inserir(aluno:Aluno): void;
    consultar(id_user: number): Aluno;
    alterar(estudante:Aluno): void;
}


class Professor extends User{
    cod_prof:number;
    nomeMateria:number
    
    constructor(cod_prof:number,nomeMateria:number ,nome: string, id_user: number, login: string, senha: string){
        super(nome,id_user,login,senha);
        this.cod_prof = cod_prof;
        this.nomeMateria = nomeMateria;
    }


    

}


class Aluno extends User {
    
    nota: number;
    turma: string;

    constructor( nota: number, turma: string, nome: string, id_user: number, login: string, senha: string) {
        super(nome, id_user, login, senha);
        this.nota = nota;
        this.turma = turma
    }

   /*  EhValido(id_user):boolean{
        if (isNaN(id_user) ){ 
            throw new id_userError("id_user Invalida: " + id_user);
        }

        return true;
    } */


    /* consultarNota(id_user):number{
        if(this.EhValido(this.id_user)){
            return this.nota
        }
    } */


}




class Diretor extends User implements IRepositoriaid_users{
    turma: Aluno[] = []

    consultar(id_user:number): Aluno {
        let id_userProcurada!: Aluno
        for (let i = 0; i < this.turma.length; i++) {
            if (this.turma[i].id_user == id_user) {
                id_userProcurada = this.id_user[i]
            }
        }
        if (!id_userProcurada) {
           throw new AlunoNaoEncontradoError("Aluno não encontrado!")
        }
        
        return id_userProcurada
    }



    inserir(aluno:Aluno): void {
        try{
            this.consultar(aluno.id_user);
            throw new AlunoJaCadastradoError("Aluno já cadastrado!")

        } catch(e:any){
            if(e instanceof AlunoNaoEncontradoError){
                throw e;
            }
            this.turma.push(aluno);
        }
    }



    consultarPorIndice(id_user: number): number {
        let indiceIdProcurado: number = -1;
        for(let i = 0; i< this.turma.length; i++){
            if(this.turma[i].id_user ==id_user){
                indiceIdProcurado = i
            }
        }
        if(indiceIdProcurado = -1){
            throw new id_userError("Id do usuario não encontrado!" )
        }
        return indiceIdProcurado;
    }



     alterar(estudante:Aluno ): void {
        let indice: number = this.consultarPorIndice(estudante.id_user);
        this.turma[indice] = estudante
    } 


    /* alterar(estudante:Aluno,nota: number ): void {
        let indice: number = this.consultarPorIndice(estudante.id_user);
        estudante.nota[indice] = nota
    }
 */



}











 

/* class Turma extends Aluno {
    alunos: Aluno[] = []


    
    EhValido(id_user:number): number {
        let id_userProcurada!: number
        for (let i = 0; i < this.alunos.length; i++) {
            if (this.alunos[i].id_user == id_user) {
                id_userProcurada = this.id_user
            }
        }
        if (!id_userProcurada) {
            throw new id_userNaoEncontradaError("id_user não encontrada!")
        }
        
        return id_userProcurada
    }
    
    
    consultarNota(id_user): void {
        if (this.EhValido(id_user)) {
            console.log(this.nota)

        } else {
            throw new id_userError("id_user invalida!")
        }

    }

} */