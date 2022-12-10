/* import { isString } from "@vue/shared"; */
import { isString } from "@vue/shared";
import {  AlunoNaoEncontradoError, AlunoJaCadastradoError,ProfessorJaCadastradoErrror, id_userError,ValorInvalidoError,HorarioInvalidoError,codProfessorError } from "./exececoes";

export class User {
    private nome: string;
    private id_user: string;
    public carga_horaria: number;
    
    constructor(nome: string,  id_user: string, carga_horaria: number ) {
        this.id_user = id_user;
        this.nome = nome;
        this.carga_horaria = carga_horaria;
        
    }

    public get idUser():string{
        return this.id_user;
    }
    public get nameUser():string{
        return this.nome;
    }  
    
    TempoDePermanencia(horario_entrada:number,horario_saida:number):void{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        let total = horario_saida - horario_entrada
        this.carga_horaria = total
    }

    qttAulasDia(horario_entrada:number,horario_saida:number):void{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        let total = horario_saida - horario_entrada
        this.carga_horaria = total/60
    }


    private validarValor(valor: number): boolean {
        if (isNaN(valor) || valor <= 0) {
            throw new ValorInvalidoError("Valor inválido: + " + valor);
        }

        return true;
    }

    private VerificarHorario(horario_entrada:number,horario_saida:number){
        if(horario_entrada>horario_saida){
            throw new HorarioInvalidoError("Horario entrada maior que horario saída")
                }
    }


}




export class Aluno extends User {    
   /*   public nota: number  ;
        faltas:number
 */
   constructor(nome: string, id_user: string,carga_horaria:number) {
       super(nome, id_user,carga_horaria);
        
   } 

   EhValido(id_user:string):boolean{
       if (!isString(id_user)){ 
           throw new id_userError("id_user Invalida: " + id_user);
       }

       return true;
   }


   FrequenciadeAulas(qttAulasDiaria:number):number{
    let minutosTotais = qttAulasDiaria *60;
    let qttAulasAssistidas = minutosTotais - this.carga_horaria;
    let qttfaltas = qttAulasAssistidas/60;
    return qttfaltas;

   }

}




 interface IAtividade{
     VizualizarAtividades():any;  
} 

export class Professor  extends User  /* implements IAtividade */{
    

    private cod_prof: string;
    
    constructor(cod_prof:string,  nome: string, id_user: string, carga_horaria: number){
        super(nome,id_user,carga_horaria);
        this.cod_prof = cod_prof;
       
    }

    public get codProfessor():string{
        return this.cod_prof;
    } 

       
    VizualizarAtividades(atividade:[]):any{
        for (let ativ of atividade){
            return ativ
        }

    }

    AulasMinistradas(){
        return this.carga_horaria/60
    }

    

}




interface IRepositoriaid_users{
    inserir(usuario: User): void;
    consultar(id_user: String): Aluno
    alterar(estudante: Aluno): void;
    excluir(idUser:string, posicao:number): void;
} 

export class Curso  implements IRepositoriaid_users{
    turma: Aluno[] = [];
    professores: Professor[] = []
    atividade:string[] = [];
    
    consultar(id_user: string): Aluno {
        let id_userProcurada!: Aluno;
        for (let i of this.turma) {
            if (i.idUser == id_user) {
                id_userProcurada = i;
            }
        }
        if (!id_userProcurada) {
           throw new AlunoNaoEncontradoError("Aluno não encontrado!");
        }
        
        return id_userProcurada;
    }



    inserir(aluno:Aluno): void {
        try {
            this.consultar(aluno.idUser);
            throw new AlunoJaCadastradoError("Aluno já cadastrado!");

        } catch(e:any) {
            if(e instanceof AlunoJaCadastradoError){
                throw e;
            }
            this.turma.push(aluno);
        }
    }

    addProfessor(prof:Professor):void{
        try {
            this.consultar(prof.codProfessor);
            throw new ProfessorJaCadastradoErrror("Professor já cadastrado!");
            
        } catch(e:any) {
            if(e instanceof ProfessorJaCadastradoErrror){
                throw e;
            }
            this.professores.push(prof);
        }
        
        
    }
    
    
    consultarPorIndice(id_user: string): number {
        let indiceIdProcurado: number = -1;
        for(let i = 0; i < this.turma.length; i++){
            if(this.turma[i].idUser == id_user){
                indiceIdProcurado = i;
            }
        }
        if(indiceIdProcurado == -1){
            throw new id_userError("Id do usuario não encontrado!" );
        }
        return indiceIdProcurado;
    }

    alterar(estudante: Aluno): void {
        let indice: number = this.consultarPorIndice(estudante.idUser);
        this.turma[indice] = estudante;
    } 

    

    excluir(id_user: string): void {
        let indice: number = this.consultarPorIndice(id_user);
        for (var i = indice; i < this.turma.length; i++) {
            this.turma[i] = this.turma[i + 1];
        }
        this.turma.pop();
    }
    
    addAtividades(nomeAtividade:string, codProfessor:string):void { 
        if(this.EhValido(codProfessor)){    
        this.atividade.push(`Nome atividade:${nomeAtividade}`)
        }else{
            throw new codProfessorError("Codigo invalido!")
        } 
    }
   

    EhValido(cod_prof:string):boolean{
        for(let i = 0; i<this.professores.length; i++){
            if(cod_prof == this.professores[i].codProfessor ){
                return true
             
            }
        } 
        throw new codProfessorError("Professor não encontrado")
        
    }
    
    /* APARENTEMENTE Curso ESTÁ OK! */
}






