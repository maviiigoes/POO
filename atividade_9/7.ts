interface FiguraGeometrica{
    perimetro(): number;
    area():number;


}

class Quadrado implements FiguraGeometrica{
    lado: number

    perimetro():number{
        return this.lado*4;
    }

    area(): number {
        return this.lado ** 4;
     }
}

class Triangulo implements FiguraGeometrica{
    lado1: number;
    lado2: number;
    base: number;
    altura:number;

    perimetro():number{
        return this.lado1+this.lado2+this.base;
    }

    area(): number {
        return (this.base*this.altura)/2;
     }
}