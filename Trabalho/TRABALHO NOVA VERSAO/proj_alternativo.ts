/* import { isString } from "@vue/shared"; */
import { isString } from "@vue/shared";
import {  AlunoNaoEncontradoError, AlunoJaCadastradoError,ProfessorJaCadastradoErrror, id_userError,ValorInvalidoError,HorarioInvalidoError,codProfessorError,AtividadeJaCadastradaError,AtividadeNaoEncontradaError } from "./exececoes";

export class User {
    private nome: string;
    private id_user: string;
    public carga_horaria_min: number;
    
    constructor(nome: string,  id_user: string, carga_horaria_min: number ) {
        this.id_user = id_user;
        this.nome = nome;
        this.carga_horaria_min = carga_horaria_min;
        
    }

    public get idUser():string{
        return this.id_user;
    }
    public get nameUser():string{
        return this.nome;
    }  
    
    TempoDePermanencia(horario_entrada:number,horario_saida:number):number{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        this.VerificarHorario(horario_entrada,horario_saida)
        let total = horario_saida - horario_entrada
        this.carga_horaria_min = total
        return total
    }

    qttAulasDia(horario_entrada:number,horario_saida:number):void{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        this.VerificarHorario(horario_entrada,horario_saida)
        let total = horario_saida - horario_entrada
        this.carga_horaria_min = total/60
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
   
   constructor(nome: string, id_user: string,carga_horaria_min:number) {
       super(nome, id_user,carga_horaria_min);
        
   } 

   private EhValido(id_user:string):boolean{
       if (!isString(id_user)){ 
           throw new id_userError("id_user Invalida: " + id_user);
       }

       return true;
   }


    FrequenciadeAulas(qttAulasDiaria:number):number{
    let minutosTotais = qttAulasDiaria *60;
    let qttAulasAssistidas = minutosTotais - this.carga_horaria_min;
    let qttfaltas = qttAulasAssistidas/60;
    return Math.ceil(qttfaltas);

   }

}


export class Professor  extends User{
    
    private cod_prof: string;
    
    constructor(cod_prof:string,  nome: string, id_user: string, carga_horaria_min: number){
        super(nome,id_user,carga_horaria_min);
        this.cod_prof = cod_prof;
       
    }

    public get codProfessor():string{
        return this.cod_prof;
    } 


    

    AulasMinistradas(){
        return this.carga_horaria_min/60

            }

        }


interface IRepositoriaid_users{
    inserir(usuario: User): void;
    consultar(id_user: String): User
    alterar(estudante: Aluno): void;
    excluir(idUser:string, posicao:number): void;
} 

export class Diretoria  implements IRepositoriaid_users{
    turma: User[] = [];
    professores: Professor[] = []
    atividade:string[] = [];
    
    consultar(id_user: string): User {
        let id_userProcurada!: User;
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



    inserir(User:User): void {
        try {
            this.consultar(User.idUser);
            throw new AlunoJaCadastradoError("Aluno já cadastrado!");

        } catch(e:any) {
            if(e instanceof AlunoJaCadastradoError){
                throw e;
            }
            this.turma.push(User);
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
    
    
}







 /* let Aluno1:Aluno = new Aluno("Jorge", "044",20);
let Aluno2:Aluno = new Aluno("Davi", "002",30);
let Aluno3:Aluno = new Aluno("Marcos", "039",50);

let Prof1:Professor = new Professor('01',"João", "044", 20);
let Prof2:Professor = new Professor('08',"Miguel", "002",15);


let direcao:Diretoria = new Diretoria();

direcao.inserir(Aluno1);
direcao.inserir(Aluno2);
direcao.inserir(Aluno3);
direcao.addProfessor(Prof1);
direcao.addProfessor(Prof2);
console.table(direcao.turma);

console.log(Aluno1.FrequenciadeAulas(1))

direcao.addAtividades("A",'01')
console.table(direcao.atividade)
  */
