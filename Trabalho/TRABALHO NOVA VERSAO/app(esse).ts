import prompt from "prompt-sync"
import { User, Professor, Aluno ,Diretoria} from "./proj_alternativo";
import  * as exe  from  "./exececoes";

let input = prompt();
let d: Diretoria = new Diretoria();

let opcao: String = '';

do {
    try {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('1 - Cadastrar aluno      2 - add prof       3 - excluir\n' +
            '4 - addatividade       5 - Carregar arquivo\n' +
            '0 - Sair\n');
        opcao = input("Opção:");
        switch (opcao) {
            case "1":
                cadastrarAluno;
                break
            case "2":
                addProf();
                break
            case "3":
                excluir();
                break;
            case "4":
                addAtividader();
                break;
            case "5":
                carregarArquivo();
                break;
            
        }


    } catch (e: any) {
        if (e instanceof exe.AplicacaoError) {
            console.log(e.message);
        } else {
            console.log("Erro não esperado.");
        }
    }
    input('Operação finalizada. Pressione <enter>');
} while (opcao != "0");


console.log("Aplicação encerrada");


function cadastrarAluno(): void {
    console.log("\nCadastrar conta\n");
    console.log("\nALUNO\n")
            let  nome =input("Digite o nome do aluno: ");
            let  id_user =input("Digite o id do usuario: ");
            let  cargaHoraria = Number(input("Digite a carga horaria ddo aluno em minutos: "))
            let aluno:Aluno = new Aluno(nome,id_user,cargaHoraria) 
            d.inserir(aluno)
}

function addProf() {
    let Cod_prof = input("Digite o codigo do professor: ");
            let  nome =input("Digite o nome do professor: ");
            let  id_user =input("Digite o id do usuario: ");
            let  cargaHoraria = Number(input("Digite a carga horaria do professor em minutos: "));
            let prof:Professor = new Professor(Cod_prof,nome,id_user,cargaHoraria)
        d.addProfessor(prof);
}

function excluir() {
    console.log("EXCLUIR\N");
        
        let  id_user =input("Digite o id do usuario: ");
        d.excluir(id_user);
}
function addAtividader() {
    let nomeAtiv = input("Digite o nome da atividade: ")
        let Cod_prof = input("Digite o codigo do professor: ");
        d.addAtividades(nomeAtiv,Cod_prof)
}



function carregarArquivo() {
    try {
        let LineReaderSync = require("line-reader-sync");
        let lrs = new LineReaderSync("./Diretoria.txt");
        console.log("Iniciando leitura de arquivo");
        while (true) {
            let linha: string = lrs.readline();
            if (linha != null) {
                let array: string[] = linha.split("-");
                let nome: string = array[0];
                let nome_u:string = array[1]
                let id: string = array[2];
                let carga_horaria: number = parseFloat(array[3]);
                let tipo!: User;
                if (nome == 'A') {
                    tipo = new Aluno(nome_u, id,carga_horaria);
                } else if (nome == 'P') {
                    let cod_prof: string = array[3];
                    tipo = new Professor(cod_prof, nome_u,id,carga_horaria);
                
                d.inserir(tipo);
                console.log('Conta lida: ' + tipo.idUser);
            } else {
                console.log("fim do arquivo")
                break;
            }
        }
        }
    } catch (e: any) {
        throw new exe.LeituraError('Falha ao ler contas de arquivo.');
    }
}

