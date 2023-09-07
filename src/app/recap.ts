const username: string | number = "Giovanni"
console.log(username)

const suma = (a: number, b: number) => a + b

suma(1,1)

class Persona{

    constructor(private Nombre: string, public edad: number){
    }
}

const Andres = new Persona("ElGio", 25)
console.log(Andres)