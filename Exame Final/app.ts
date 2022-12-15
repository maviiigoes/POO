import prompt from "prompt-sync"

import * as bat from "./batalha_civi"

import {AplicacaoError} from "./excessoes"

let input = prompt()

let opcao: String = " ";
let exercito1: bat.IOpcoes[] = []
let exercito2: bat.IOpcoes[] = []


do{
    try{
        console.log("Bem vindos ao campop de batalha!")
        console.log("Digite o seus nomes para continuarmos:")
        let jogador1 = input("Digite o nome do jogador 1: ")
        let jogador2 = input("Digite o nome do jogador 2: ")

        console.log("\n\n Agora vamos criar os exercitos!")
        
        console.log(`\n\nVamos criar o exercito do jogador ${jogador1}\n\n`)
        

            let id = Number(input(`Digite o id do soldado 1: `))
            let tipo = input(`Digite o tipo do soldado 1: `)
            let forcaAtaque = Number(input(`Digite a força de ataque do soldado 1: `))

            let soldado1: bat.Soldado = new bat.Soldado(id,tipo,forcaAtaque,15)


            exercito1.push(soldado1)


            let id2 = Number(input(`Digite o id do soldado 2: `))
            let tipo2 = input(`Digite o tipo do soldado 2: `)
            let forcaAtaque2 = Number(input(`Digite a força de ataque do soldado 2: `))

            let soldado2: bat.Soldado = new bat.Soldado(id2,tipo2,forcaAtaque2,15)


            exercito1.push(soldado2)


            let idb1 = Number(input("Digite o id da Base de Defesa 1: "))
            let _x1 = Number(input("Digite a posição x da Base de Defesa 1: "))
            let _y1 = Number(input("Digite a posição y da Base de Defesa 1: "))
            
            let BaseDeDefesa1: bat.BaseDeDefesa = new bat.BaseDeDefesa(idb1,_x1,_y1,100)

            
            exercito1.push(BaseDeDefesa1)

        


            console.log(`\n\nVamos criar o exercito do jogador ${jogador2}\n\n`)
        

            let id3 = Number(input(`Digite o id do soldado 3: `))
            let tipo3 = input(`Digite o tipo do soldado 3 `)
            let forcaAtaque3 = Number(input(`Digite a força de ataque do soldado 3: `))

            let soldado3: bat.Soldado = new bat.Soldado(id3,tipo3,forcaAtaque3,15)


            exercito2.push(soldado3)


            let id4 = Number(input(`Digite o id do soldado 4: `))
            let tipo4 = input(`Digite o tipo do soldado 4: `)
            let forcaAtaque4 = Number(input(`Digite a força de ataque do soldado 4: `))

            let soldado4: bat.Soldado = new bat.Soldado(id4,tipo4,forcaAtaque4,15)


            exercito2.push(soldado4)

            let idb2 = Number(input("Digite o id da Base de Defesa 2: "))
            let _x2 = Number(input("Digite a posição x da Base de Defesa 2: "))
            let _y2 = Number(input("Digite a posição y da Base de Defesa 2: "))
            
            let BaseDeDefesa2: bat.BaseDeDefesa = new bat.BaseDeDefesa(idb2,_x2,_y2,100)


            exercito2.push(BaseDeDefesa2)






        console.log("Exercitos prontos! Vamos jogar!")

        let i: number = 1
        while(i < 4){

        console.log("\n\nVez do Jogador 1. Digite a sua opção: \n\n")
        console.log("1- Atacar exercito do oponente!")
           let opcao = Number(input("Digite sua opção: "))
           if(opcao== 1){
        
               console.log("Digite qual você gostaria de atacar: ");
                console.log("1-Soldado 3 \n2-Soldado 4 \n3-Base de Defesa")
                let atacado = Number(input("Digite a sua opçao: "));
    
                console.log("Digite com qual você gostaria de atacar: ");
                console.log(`1-Soldado 1 (força de ataque:${soldado1.ForcaAtaque})\n \n2-Soldado 2 (força de ataque:${soldado2.ForcaAtaque})\n`)
                console.log(`Qtt de vida restante soldado 1: ${soldado1.Vida}`)
                console.log(`Qtt de vida restante soldado 2: ${soldado2.Vida}`)
                let atacante = Number(input("\n\nDigite sua opção: \n"))

                if(atacante == 1 && atacado== 1){
                    soldado1.atacar(soldado3)
                    
                }if(atacante == 1 && atacado== 2){
                     soldado1.atacar(soldado4)
                    
                }if(atacante == 1 && atacado== 3){
                     soldado1.atacar(BaseDeDefesa2)
                     
                }if(atacante == 2 && atacado== 1){
                     soldado2.atacar(soldado3)
                     
                }if(atacante == 2 && atacado== 2){
                    soldado2.atacar(soldado4)
                    
                }if(atacante == 2 && atacado== 3){
                    soldado2.atacar(BaseDeDefesa2)
                    
                }
           }

           console.log("\n\nVez do Jogador 2. Digite a sua opção: \n\n")
           console.log("1- Atacar exercito do oponente!")
              let opcao2 = Number(input("Digite sua opção: "))
              if(opcao2== 1){
           
                  console.log("Digite qual você gostaria de atacar: ");
                   console.log(`1- Soldado 1 \n2-Soldado 2 \n3-Base de Defesa`)
                   let atacado = Number(input("Digite a sua opçao: "));
       
                   console.log("Digite com qual você gostaria de atacar: ");
                   console.log(`1-Soldado 3 (força de ataque:${soldado3.ForcaAtaque})\n2-Soldado 4 (força de ataque:${soldado4.ForcaAtaque})\n`)
                   console.log(`Qtt de vida restante soldado 3: ${soldado3.Vida}`)
                   console.log(`Qtt de vida restante soldado 4: ${soldado4.Vida}`)
                   let atacante = Number(input("\n\nDigite sua opção: \n"))

                   
                try{
                    if(atacante == 1 && atacado== 1){
                         soldado3.atacar(soldado1)

                    }if(atacante == 1 && atacado== 2){
                         soldado3.atacar(soldado2)

                    }if(atacante == 1 && atacado== 3){
                         soldado3.atacar(BaseDeDefesa1)

                    }if(atacante == 2 && atacado== 1){
                         soldado4.atacar(soldado1)

                    }if(atacante == 2 && atacado== 2){
                        soldado4.atacar(soldado2)

                    }if(atacante == 2 && atacado== 3){
                        soldado4.atacar(BaseDeDefesa1)
                    }
                }catch(e:any){
                    console.log(e.message)
                }
                   
              }

              console.log(`Partida ${i} de 3 `);
              let  continuar = input("Clique <enter> para continuar!")
              i++
        }

        console.log("Jogo finalizado!")

        let Cenario : bat.CenarioDeBatalha = new bat.CenarioDeBatalha
        console.log(Cenario.avaliar(exercito1,exercito2))

        console.log("Digite 0 para finalizar!")



        
    }catch (e: any) {
        if (e instanceof AplicacaoError) {
            console.log(e.message);
        } else {
            console.log("Erro não esperado.");
        }
    }
    input('Operação finalizada. Pressione <enter>');
}while (opcao != "0");





















/* function CriandoE1( jogador1:string){

    console.log(`\n\nVamos criar o exercito do jogador ${jogador1}\n\n`)
        

            let id = Number(input(`Digite o id do soldado 1: `))
            let tipo = input(`Digite o tipo do soldado 1 `)
            let forcaAtaque = Number(input(`Digite a força de ataque do soldado 1 `))

            let soldado1: bat.Soldado = new bat.Soldado(id,tipo,forcaAtaque,10)


            exercito1.push(soldado1)


            let id2 = Number(input(`Digite o id do soldado 2: `))
            let tipo2 = input(`Digite o tipo do soldado 2: `)
            let forcaAtaque2 = Number(input(`Digite a força de ataque do soldado 2: `))

            let soldado2: bat.Soldado = new bat.Soldado(id2,tipo2,forcaAtaque2,10)


            exercito1.push(soldado2)


            let idb1 = Number(input("Digite o id da Base de Defesa 1: "))
            let _x1 = Number(input("Digite a posição x da Base de Defesa 1: "))
            let _y1 = Number(input("Digite a posição y da Base de Defesa 1: "))
            
            let BaseDeDefesa1: bat.BaseDeDefesa = new bat.BaseDeDefesa(idb1,_x1,_y1,100)

            
            exercito1.push(BaseDeDefesa1)


}

function CriandoE2(jogador2:string){
    console.log(`\n\nVamos criar o exercito do jogador ${jogador2}\n\n`)
        

            let id3 = Number(input(`Digite o id do soldado 3: `))
            let tipo3 = input(`Digite o tipo do soldado 3 `)
            let forcaAtaque3 = Number(input(`Digite a força de ataque do soldado 3 `))

            let soldado3: bat.Soldado = new bat.Soldado(id3,tipo3,forcaAtaque3,10)


            exercito2.push(soldado3)


            let id4 = Number(input(`Digite o id do soldado 4: `))
            let tipo4 = input(`Digite o tipo do soldado 4: `)
            let forcaAtaque4 = Number(input(`Digite a força de ataque do soldado 4: `))

            let soldado4: bat.Soldado = new bat.Soldado(id4,tipo4,forcaAtaque4,10)


            exercito2.push(soldado4)

            let idb2 = Number(input("Digite o id da Base de Defesa 2: "))
            let _x2 = Number(input("Digite a posição x da Base de Defesa 2: "))
            let _y2 = Number(input("Digite a posição y da Base de Defesa 2: "))
            
            let BaseDeDefesa2: bat.BaseDeDefesa = new bat.BaseDeDefesa(idb2,_x2,_y2,100)


            exercito2.push(BaseDeDefesa2)

} */
