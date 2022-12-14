import { User,Aluno } from "./trabalhoTeste";

export interface IRepositoriaid_users{
    inserir(usuario: User): void;
    consultar(id_user: String): User
    alterar(estudante: Aluno): void;
    excluir(idUser:string, posicao:number): void;
} 