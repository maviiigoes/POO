class Hora{
   constructor(private hora:number,private minuto:number,private segundos:number){} 

    get hora_valor():number{
        return this.hora 
    
   }

   get minuto_valor():number{
    return this.minuto;
   }

   get segundo_valor():number{
    return this.segundos;
   }

   get horario():string{
    return `${this.hora}:${this.minuto}:${this.segundos}`;
   }

}

let hora = new Hora(1,25,30)
console.log(hora.hora_valor);
console.log(hora.minuto_valor);
console.log(hora.segundo_valor);
console.log(hora.horario);
 


/*
RESPOSTA:
1
25
30
1:25:30
*/