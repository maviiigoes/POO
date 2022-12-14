import prompt from "prompt-sync"
import { Aluno, Professor, Diretoria, User } from "./trabalhoTeste"
import  * as exe  from  "./execessoes"
import * as fs from "fs"
const ip = fs.readFileSync("BasedeDadosDoSistema.txt", "utf-8")

let input = prompt()

let i = 0


let t:Diretoria = new Diretoria("02","josefa","04",10); 



let opcao: String = '';

do{
    try{
        console.log('\n Bem vindo Diretor \n\n Digite 1 para continuar');
        
        
        opcao = input("Opção: ");
        switch(opcao)
        {
            case "1":
                CategoriaDiretor();
                
                break
            
                
        }
    }catch(e:any){
        if(e instanceof exe.AplicacaoError){
            console.log(e.message)
        }else {
            console.log("Erro não esperado.");
        }
    }
    input("Operção finalizada!")
} while (opcao != "0");



    





function CategoriaDiretor():void{
    console.log("Digite a opção desejada:")
    console.log("1-CONSULTAR \n2- INSERIR ALUNO \n 3-EXCLUIR \n4- INSERIR PROFESSOR \n5-MOSTRAR INFORMAÇÕES COMPLETAS\n");
    let o:number = Number(input("Digite sua opção:"));
    if(o == 1){
        let id = input("Digite o id do usuario que vc gostaria de consultar: ")
        t.consultar(id)
        Exibir(id)
    }if(o == 2){
        let nome = input("Digite o nome do aluno: ")
        let id = input("Digite o id do aluno: ")
        let carga_horaria:number = Number(input("Digite a carga horária do aluno: "))
        let cod_aluno = input("Digite o codigo do aluno: ")
        let novo_aluno:Aluno = new Aluno(nome,id,carga_horaria,cod_aluno);
        t.inserir(novo_aluno)
    }if(o == 3){
        let id = input("Digite o id do aluno: ")
        t.excluir(id)
    }if(o == 4){
        let nome = input("Digite o nome do professor: ")
        let id = input("Digite o id do professor: ")
        let cod_prof:string = input("Digite o codigo do professor")
        let carga_horaria:number = Number(input("Insira a carga horaria do professor:"));
        let novo_prof:Professor = new Professor(cod_prof,nome,id,carga_horaria);
        t.addProfessor(novo_prof)
    }if(o== 5){
        console.log("Relatorio completo")
        console.table(t.turma)
           
    }
}

function Exibir(id_user:string):void{
    console.log(` Id: ${t.consultar(id_user).idUser}\n Nome: ${t.consultar(id_user).nameUser }\n Nota:${t.consultar(id_user)} `)
}

