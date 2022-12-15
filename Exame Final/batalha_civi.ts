import { SoldadoEliminadoExepiton } from "./excecoes";

export interface IOpcoes {
    eliminado(): boolean;
    defender(valorAtaque: number): void;
}

class Identificador {
    
    constructor(private _id: number){};

    get Id():number{
        return this._id
    }

}


export class Soldado extends Identificador implements  IOpcoes{
    private _tipo_soldado: string;
    private _forcaAtaque: number;
    private _vida: number;

    constructor(Id:number,tipo_soldado:string,forcaAtaque:number,vida:number){
        super(Id)
        this._tipo_soldado = tipo_soldado;
        this._forcaAtaque = forcaAtaque;
        this._vida = vida  ;
    }

    get Vida():number{
        return this._vida

    }

    get ForcaAtaque():number{
        return this._forcaAtaque

    }


    atacar(defensivel:IOpcoes){
        if(defensivel.eliminado()){
            throw new SoldadoEliminadoExepiton("Soldado ja foi eliminado");
        }
    
        defensivel.defender(this._forcaAtaque)
    
    }

    eliminado(): boolean {
        return this._vida <=0;
    }

    defender(valorAtaque: number): void {
        this._vida = this._vida - valorAtaque;
    }
}

export class BaseDeDefesa extends Identificador implements IOpcoes{
    private _x: number;
    private _y: number;
    private _percentualDeDanos: number = 0


    constructor(Id:number, x:number, y:number, percentualDeDanos:number){
        super(Id)
        this._x = x;
        this._y = y;
        this._percentualDeDanos = percentualDeDanos;
    }


    eliminado(): boolean {
        return this._percentualDeDanos >= 90;
    }
    defender(valorAtaque: number): void {
        this._percentualDeDanos = this._percentualDeDanos + valorAtaque;
    }

}

enum ResultadoBatalha {
    CIVILIZACAO1 = "Civilização 01",
    CIVILIZACAO2 = "Civilização 02",
    
    EMPATE = "Empate"

}


export class CenarioDeBatalha {
    avaliar(exercito1: IOpcoes[], exercito2: IOpcoes[]): ResultadoBatalha {
        let totalEliminados1: number = 0;
        for (let i = 0; i < exercito1.length; i++) {
            if (exercito1[i].eliminado()) {
                totalEliminados1++
            }
        }

        let totalEliminados2: number = 0;
        for (let i = 0; i < exercito2.length; i++) {
            if (exercito2[i].eliminado()) {
                totalEliminados2++
            }
        }

        let resultado: ResultadoBatalha;
        if (totalEliminados1 < totalEliminados2) {
            resultado = ResultadoBatalha.CIVILIZACAO1;
        } else if (totalEliminados1 > totalEliminados2) {
            resultado = ResultadoBatalha.CIVILIZACAO2;
        } else {
            resultado = ResultadoBatalha.EMPATE;
        }

        return resultado;
    }
}