function eh_primo(numero: number): boolean{
        let primo = false
    for(let i = 2 ; i<= numero-1; i++){
        if(numero % i == 0){
            primo = true;
        }else{
            primo =  false;
        }
    }
    return primo
}

