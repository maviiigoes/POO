import { isString } from "@vue/shared";
import {  AlunoNaoEncontradoError, AlunoJaCadastradoError,ProfessorJaCadastradoErrror, id_userError,ValorInvalidoError,HorarioInvalidoError,AtividadeJaCadastradaError,AtividadeNaoEncontradaError,codProfessorError } from "./execessoes";
import { IAlunos } from "./IAlunos";
import { IRepositoriaid_users } from "./IDiretoria";


export class User {
    private nome: string;
    private id_user: string;
    public carga_horaria_min: number;
    public atividades:string[] = [];
    private notas:number[] = [];
    
    constructor(nome: string,  id_user: string, carga_horaria_min: number) {
         this.id_user = id_user;
         this.nome = nome;
         this.carga_horaria_min = carga_horaria_min
        
     }

    
    public get nameUser():string{
        return this.nome;
    } 

    public get idUser():string{
        return this.id_user;
    }  


    public get Notas():number[]{
        return this.notas;
    }  
    
    
    
    
    TempoDePermanencia(horario_entrada:number,horario_saida:number):number{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        this.VerificarHorario(horario_entrada,horario_saida);
        let total = horario_saida - horario_entrada;
        this.carga_horaria_min = total
        return total
    }

    qttAulasDia(horario_entrada:number,horario_saida:number):void{
        this.validarValor(horario_entrada);
        this.validarValor(horario_saida);
        this.VerificarHorario(horario_entrada,horario_saida)
        let total = horario_saida - horario_entrada
        this.carga_horaria_min = total/60;
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


export class Aluno extends User implements IAlunos,INotas{  
    cod_aluno:string

    constructor(nome: string, id_user: string,carga_horaria_min:number,cod_aluno:string) {
        super(nome,id_user,carga_horaria_min);
        this.cod_aluno = cod_aluno
        carga_horaria_min = 0;
    } 


    //----------------------------------------------------//
    verificarNotas(idProf: string): number {
        throw new Error("Method not implemented.");
    }

    private EhValido(id_user:string):boolean{
        if (!isString(id_user)){ 
        throw new id_userError("id_user Invalida: " + id_user);
        }
        return true;
    }

    // verificarNotas(direcao:Diretoria): number {
    //     for (let i = 0; i < direcao.Turma.length; i++) {
    //         if (direcao.Turma[i].idUser == this.cod_aluno){
    //             return direcao.Turma[i].Notas[i];
    //         } 
    //     }
    //     return 0;
    // }

    consultarnotas(direcao:Diretoria,idAluno:string): number[]{
        for (let i = 0; i < direcao.turma.length; i++) {
            if(direcao.turma[i].cod_aluno == idAluno){
                return direcao.turma[i].Notas;
            }else{
                throw new AlunoNaoEncontradoError('Aluno não encontrado');
            }
        }
        return [0];
    }

   verificarAtividades():void{
        for (let i = 0; this.atividades.length; i++) {
            console.log(this.atividades[i]);
        }
    }

    public FrequenciadeAulas(qttAulasDiaria:number):number{
        let minutosTotais = qttAulasDiaria *60;
        let qttAulasAssistidas = minutosTotais - this.carga_horaria_min;
        let qttfaltas = qttAulasAssistidas/60;
        return Math.ceil(qttfaltas);
        
    }

    verificarturma(direcao:Diretoria): Aluno[] {
        return direcao.turma;
    }

}

interface INotas{
    consultarnotas(direcao:Diretoria,idAluno:string): number[]
}


export class Professor extends User implements INotas{
    private cod_prof: string;
    
    constructor(cod_prof:string,  nome: string, id_user: string, carga_horaria_min: number){
        super(nome,id_user,carga_horaria_min);
        this.cod_prof = cod_prof;
        carga_horaria_min = 0;
    }

    inserirNota(direcao:Diretoria, id_aluno:string,nota:number[]):void{
        for (let i = 0; i < direcao.turma.length; i++) {
            if(direcao.turma[i].idUser === id_aluno){
                direcao.turma[i].Notas.push(nota[i]);
            } 
        }
    }


    addAtividades(nomeAtividade:string):void {
        this.atividades.push(nomeAtividade) ;
    }


    vizualizarAtividade(){
        return this.atividades
    }
    vizualizarNotas(){
        return this.Notas;
    }

    
    public get codProfessor():string{
        return this.cod_prof;
    } 
    


    consultarnotas(direcao:Diretoria,idAluno:string): number[]{
        for (let i = 0; i < direcao.turma.length; i++) {
            if(direcao.turma[i].cod_aluno == idAluno){
                return direcao.turma[i].Notas;
            }else{
                throw new AlunoNaoEncontradoError('Aluno não encontrado');
            }
        }
        return [0];
    }

    // AulasMinistradas(){
    //     return this.carga_horaria_min/60
    // }

}


export class Diretoria  extends User implements IRepositoriaid_users{
    cod_diretoria: string;
    turma: Aluno[] = [];
    professores: Professor[] = [];
    
    constructor(cod_diretoria: string,nome: string, id_user: string,carga_horaria_min:number){
        super(nome,id_user,carga_horaria_min)
        this.cod_diretoria = cod_diretoria
    }


    public get Professores(): Professor[]{
        return this.professores;
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
    
    consultar(id_user: string): User {
        let id_userProcurada!: User;
        for (let i of this.turma) {
            if (i.idUser === id_user) {
                id_userProcurada = i;
            }
        }
        if (!id_userProcurada) {
           throw new AlunoNaoEncontradoError("Aluno não encontrado!");
        }
        
        return id_userProcurada;
    }


    addProfessor(prof:Professor):void{
        try {
            this.consultarPorIndice(prof.codProfessor);
            throw new ProfessorJaCadastradoErrror("Professor já cadastrado!");
            
        } catch(e:any) {
            if(e instanceof ProfessorJaCadastradoErrror){
                throw e;
            }
            this.Professores.push(prof);
        }
        
    }
    
    
    consultarPorIndice(id_user: string): number {
        let indiceIdProcurado: number = -1;
        for(let i = 0; i < this.turma.length; i++){
            if(this.turma[i].idUser === id_user){
                indiceIdProcurado = i;
            }
        }
        if(indiceIdProcurado == -1){
            throw new id_userError("Id do usuario não encontrado!" );
        }
        return indiceIdProcurado;
    }


    EhValido(cod_prof:string):boolean{
        for(let i = 0; i<this.Professores.length; i++){
            if(cod_prof === this.Professores[i].codProfessor){
                return true;
            }
        } 
        throw new codProfessorError("Professor não encontrado");
        
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



    inserirativ(atividade:string): void {
        try {
            this.consultar(atividade);
            throw new AtividadeJaCadastradaError("Atividade ja cadastrada!");

        } catch(e:any) {
            if(e instanceof AtividadeJaCadastradaError){
                throw e;
            }
            this.atividades.push(atividade);
        }
    }

    




}



// addAtividades(nomeAtividade:string, codProfessor:string):void { 
//     if(this.EhValido(codProfessor)){    
//     this.atividade.push(`Nome atividade:${nomeAtividade}`)
//     }else{
//         throw new codProfessorError("Codigo invalido!")
//     } 
// }


// let usuario1:User = new User("Daniel", "004",200);
// let usuario2:User = new User("Marcos", "044",360);

/* let Aluno1:Aluno = new Aluno("Jorge", "044", 200, "01");
let Aluno2:Aluno = new Aluno("Davi", "002", 300,"02");
let Aluno3:Aluno = new Aluno("Marcos", "039", 400,"03");

let Prof1:Professor = new Professor('001',"Marcos Aurelio", "2022001",300);
let Prof2:Professor = new Professor('002',"Vinicius Junior", "2022002",400);
 */


// let user:User = new User()


/* let direcao:Diretoria = new Diretoria("02","josefa","04");

direcao.inserir(Aluno1);
direcao.inserir(Aluno2);
direcao.inserir(Aluno3);

direcao.addProfessor(Prof1); */
/*
direcao.addProfessor(Prof2);

Prof1.inserirNota(direcao,'044',[10, 8, 9]);
Prof1.inserirNota(direcao,'044',[10, 8, 9]);

console.table(Aluno1.consultarnotas(direcao,"03")); */

/* Prof1.addAtividades("A")
console.table(Prof1.vizualizarAtividade) */

/* 
 */


