/*
class Radio {
    volume : number;
    constructor(volume : number) {
    this.volume = volume;
    }
    }
    let r : Radio = new Radio();
    r.volume = 10;
    */



//RESPOSTA: O parâmetro valor não foi passado 

// PROPOSTA DE SOLUÇÃO:



    class Radio {
        volume : number;

        constructor(volume : number) {
        this.volume = volume;
        }
        }

        let r : Radio = new Radio(/*valor*/ 5);
        r.volume = 10;

        