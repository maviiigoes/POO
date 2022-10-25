
class Produto{
    private _Id: string;
    private _descricao : string;
    private _qtt: number;
    private _valorUni: number; 

    constructor( _Id: string, _descricao : string,   qtt: number,   _valorUni: number){
        this._Id = _Id;
        this._descricao = _descricao;
        this._qtt = qtt;
        this._valorUni = _valorUni;
    }

    repor(qtt_repor:number):number{
        this._qtt = qtt_repor+this._qtt
        return this._qtt;
        
    }

    baixa(qtt_baixa: number):number{
        this._qtt = this._qtt-qtt_baixa;
        return this._qtt
    }
    get id():string{
        return this._Id
    }



}
class ProdutoPerecivel extends Produto{
    private _dataValidade: Date;

    constructor( _Id: string, _descricao : string,   qtt: number,   _valorUni: number,_dataValidade: Date){
        super(_Id,_descricao,_valorUni,qtt)
        this._dataValidade = _dataValidade ;
    }
    
    EhValido():boolean{     
        return Date.now() >= this._dataValidade.getDate()
    
    }
 
    }

    class  Estoque extends ProdutoPerecivel {
        private ListaProdutos = []

        constructor(_Id: string, _descricao : string,   qtt: number,   _valorUni: number,_dataValidade: Date){
            super(_Id,_descricao,_valorUni,qtt,_dataValidade)

        }   

        InserirProduto(prod:Produto): void{
            let NovoProduto = this.consultarId(prod.id);

            if(NovoProduto = -1){
                this.ListaProdutos.push(prod)
            }else{
                console.log("Produto já cadastrado")
            }

        }
        
        consultarId(id:string):number{
            let idProcurado = -1;
            for(let i: number= 0; i<this.ListaProdutos.length; i++){
                if(this.ListaProdutos[i] == id){
                    idProcurado = i;
                    break;
                }
            }
            return idProcurado;
        }

        excluir(id:string):void{
            let prodExcluir : number = this.consultarId(id);
            if(prodExcluir != -1){
                for(let i :number = prodExcluir; i< this.ListaProdutos.length; i++){
                    this.ListaProdutos[i]= this.ListaProdutos[i+1];
                }
                this.ListaProdutos.pop()
            }


        }
    }

