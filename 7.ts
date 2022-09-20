class Pessoa {
    name: string;
    paymentTime: number;
    prefferedLang: string;

    constructor(name: string, paymentTime: number, prefferedLang: string) {
        this.name = name;
        this.paymentTime = paymentTime;
        this.prefferedLang = prefferedLang;
    }
    
    output(): void {
        console.log(`
        ${this.name}
        My payment time is ${this.paymentTime}
        and
        my preffered language is ${this.prefferedLang}
        `);
    }
}

function main(): void {
    let ely: Pessoa = new Pessoa('Ely', 120.56, 'TypeScript');

    ely.output();
}

main()