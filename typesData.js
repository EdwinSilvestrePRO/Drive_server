console.log("Tipos de datos en JavaScript (con curiosidad)");
console.log("En Javascript hay 6 tipos de datos primitivos");

function Undefined () {}
Object.defineProperty(Undefined, Symbol.hasInstance, {
    value: instance => instance == undefined
});

// Declaración implísita y explísita del valor primitivo undefined.
// eso se puede hacer con variables no constantes.
let data;
data = undefined;

console.log(data);

// En las constantes siempre hay que definir explísitamente el valor que queremos poner.
// i no se puede sustituir el valor dato...
const data2 = undefined;
// Y aquí puedo obtener datos de tipo boolean.
// que solo puede contener dos posibles valores true o false
var existeTierra = data2 instanceof Undefined;
var noExistes = !existeTierra;
console.log(existeTierra);
console.log(noExistes);

// Las cadenas de texto o string.
const name = "Neverneit Sober";
console.log(name);

// Los tipos de datos numericos
let age = 17;
console.log(age);
// Los tipos de datos bigInt. Que es un tipo de formato numerico de presición arbitraria en JavaScript.
const data4 = 8888888888888885777n - BigInt(7);
console.log(data4);

// Los tipos Symbol. Que son datos Únicos.
const Gama = Symbol("Gama"),
Gama2 = Symbol("Gama");

console.log(Gama);
console.log(Gama2, "\n");
// Los valores nulos son valores primitivos especiales en javaScript. su tipo es Object
let val = null;
console.log("En Javascript hay un tipo de dato primitivo especial que se destaca por ser nulo: ", val);
let t = {
    name: "Neverneit Ster",
    age: 17,
    isEarly: false
}
console.log(t.name);
console.log(t.age);
console.log(t.prototype);

const cara = Symbol("cara");


const ob = {
    [cara]: back=> back*back,
    name: "Neverneit",
    lastName: "Sober",
    age: 17,
    isSingle: true
}
console.log(ob);

// alert, confirm y prompt (Navegador)

// ***************** Ploblema 1 **********************
/* Ciclo de un triángulo
Escriba un ciclo que haga siete llamadas a console.log para generar el siguiente
triángulo:
#
##
###
####
#####
######
#######
 
const lines = 7;
let hash = "#";
*/
for ( let line = 1; line <= lines; line++ ) {
    let value = "";
    for ( let repeat = 1; repeat <= line; repeat++ )
    value += hash;
    console.log(value);
}


// ***************** Ploblema 2 **********************
/* Mínimo
El capítulo anterior introdujo la función estándar Math.min que devuelve su
argumento más pequeño. Nosotros podemos construir algo como eso ahora.
Escribe una función min que tome dos argumentos y retorne su mínimo. */
function getMin (...numbers) {
    let min = null;
    for (let value of numbers) {
        if (min !== null)
            value < min? min = value : value = min;
            
            else min = value;
    }
    return min;
}

console.log(getMin(7, 8, 9, 10, -13, 4, 6, 3, 8, 9, 0, 8));


// ***************** Ploblema 3 **********************
/* Define una función recursiva esPar que corresponda a esta descripción. La
función debe aceptar un solo parámetro (un número entero, positivo) y devolver
un Booleano.
Pruébalo con 50 y 75. Observa cómo se comporta con -1. Por qué? Puedes
pensar en una forma de arreglar esto?
*/
let whatType = Tp => typeof Tp == "bigint";
let response = null;
function esPar (numberActual) {
    const query = response !== null? response : response = whatType(numberActual);
    
    let two = query? 2n : 2, zero = query? 0n : 0;

    if (numberActual <= zero)
        return esPar(numberActual+two);
    
    else 
        return(numberActual % two) == zero;    
}
// console.log(esPar(75));
// console.log(esPar(50));
console.log(esPar(-1n));

/* Conteo de frijoles
Puedes obtener el N-ésimo carácter, o letra, de un string escribiendo "string"[
N]. El valor devuelto será un string que contiene solo un carácter (por ejemplo,
"f"). El primer carácter tiene posición cero, lo que hace que el último se
encuentre en la posición string.length - 1. En otras palabras, un string de
dos caracteres tiene una longitud de 2, y sus carácteres tendrán las posiciones
0 y 1.
Escribe una función contarFs que tome un string como su único argumento
y devuelva un número que indica cuántos caracteres “F” en mayúsculas haya
en el string.
Despues, escribe una función llamada contarCaracteres que se comporte
como contarFs, excepto que toma un segundo argumento que indica el carácter
que debe ser contado (en lugar de contar solo caracteres “F” en mayúscula).
Reescribe contarFs para que haga uso de esta nueva función.
*/
function countLetter (string, letter) {
    let count = 0;
    for (let char of string.split(""))
        char == letter? count++ : char;
    return count;
}
let oration = `Conteo de frijoles
Puedes obtener el N-ésimo carácter, o letra, de un string escribiendo "string"[
N]. El valor devuelto será un string que contiene solo un carácter (por ejemplo,
"f"). El primer carácter tiene posición cero, lo que hace que el último se
encuentre en la posición string.length - 1. En otras palabras, un string de
dos caracteres tiene una longitud de 2, y sus carácteres tendrán las posiciones
0 y 1.
Escribe una función contarFs que tome un string como su único argumento
y devuelva un número que indica cuántos caracteres “F” en mayúsculas haya
en el string.
Despues, escribe una función llamada contarCaracteres que se comporte
como contarFs, excepto que toma un segundo argumento que indica el carácter
que debe ser contado (en lugar de contar solo caracteres “F” en mayúscula).
Reescribe contarFs para que haga uso de esta nueva función.`;
console.log(countLetter(oration, "F"))



// =========== Atrvimiento para exparsirme ==================
// contexto Window (el contexto Global.)
window.context = "window";
function Argo (number) {
    console.log(this.context, number);
}
const ob2 = {
    context: "ob",
    Argo: Argo.bind({
        context: "Objeto Arbitrario"
    }),
    oblv2: {
        context: "oblv2",
        oblv3: {
            context: "oblv3",
            oblv4: {
                context: "oblv4",
            }
        }
    }
}
// ob.Argo(60);
function ViewResume () {
    const resume = `Hola, mi nombre es ${this.name} con ${this.age} años. Tengo ${this.time}
    en la programación y mi objetivo es ser ${this.position}`;
    console.log(resume);
}

ViewResume.bind({
    name: "Neverneit Sober",
    age: 17,
    position: "Software Engineer",
    time: "2 years"
}).call();


// ***************** Ploblema 4 **********************

/* Escribe una función rango que tome dos argumentos, inicio y final, y
retorne un array que contenga todos los números desde inicio hasta (e incluyendo) final.
Luego, escribe una función suma que tome un array de números y retorne
la suma de estos números. Ejecuta el programa de ejemplo y ve si realmente
retorna 55.
Como una misión extra, modifica tu función rango para tomar un tercer
argumento opcional que indique el valor de “paso” utilizado para cuando construyas el array. Si no se da ningún paso, los elementos suben en incrementos
de uno, correspondiedo al comportamiento anterior. La llamada a la función
rango(1, 10, 2) deberia retornar [1, 3, 5, 7, 9]. Asegúrate de que también
funcione con valores de pasos negativos para que rango(5, 2, -1) produzca
[5, 4, 3, 2]. */

function addition (matriz) {
    let result = 0;
    matriz?.forEach(value=> result += value);

    return result;
}

function range (start, end, pase = 1) {
    let rangeMatriz = []; // 3 / 7
    
    if (pase == 0)
        pase = 1;
    else if (pase > 0)
        for (; start <= end; start+=pase)
            rangeMatriz.push(start);
    else 
        for (; start >= end; start+=pase)
            rangeMatriz.push(start);

    return rangeMatriz;
}

console.log(range(1, 10));

console.log(addition(range(1, 10)));

console.log(range(1, 10, 2));

console.log(range(5, 2, -1));


// ***************** Ploblema 5 **********************

/* Los arrays tienen un método reverse que cambia al array invirtiendo
el orden en que aparecen sus elementos. Para este ejercicio, escribe dos
funciones, revertirArray y revertirArrayEnSuLugar. El primero, revertirArray,
toma un array como argumento y produce un nuevo array que tiene los mismos
elementos pero en el orden inverso. El segundo, revertirArrayEnSuLugar, hace lo
que hace el métodoreverse: modifica el array dado como argumento invirtiendo
sus elementos. Ninguno de los dos puede usar el método reverse estándar.

function revertirArray (oldArr) {
    let newArr = [];
    for (let last = oldArr.length - 1; last >= 0; last--)
        newArr[newArr.length] = oldArr[last];
    return newArr;
}
let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function revertirArrayEnSuLugar (matriz) {
    array1 = revertirArray(matriz);
}
revertirArrayEnSuLugar(array1);

console.log(array1);

console.log(revertirArray(array1));
*/

// Atrevimiento (Lista genérica).
/* function listArray (ArrActual) {
    var lista = {}

    let level = 1;

    for (let index = 0; index < ArrActual.length; index++) {
        if(lista.value == undefined) {
            lista.value = ArrActual[index];
            lista["rest"] = null;
        }
        else {
            const isLast = (ArrActual.length-1) == index;

            let access = 0;

            let countAccessKey = "";
            let countAccessKey2 = "";
            while (access <= level) {
                countAccessKey += ".rest";
                countAccessKey2 += ".rest";
                access++;
            }
            var Action = Function("list, data, isLast", `
            
            list${countAccessKey.replace(".rest", "")} = isLast? {rest: null, value: data} : {value: data};

            return list;
            `);

            lista = Action(lista, ArrActual[index], isLast);

            level++;
        }
    }


    console.log(JSON.stringify(lista));
}

listArray([1, 2, 3]);
let p1 = {
    "value":1,
    "rest": {
        "value":2,
        "rest": {
            "rest": null,"value": 3
        }
    }
}
let p2 =  {
    valor: 1,
    resto: {
    valor: 2,
    resto: {
    valor: 3,
    resto: null
    }
    }
    }; */
    
    
    
    // ***************** Ploblema 6 **********************
/* 1. car y cat
2. pop y prop
3. ferret, ferry, y ferrari
4. Cualquier palabra que termine ious
5. Un carácter de espacio en blanco seguido de un punto, coma, dos puntos
o punto y coma
6. Una palabra con mas de seis letras
7. Una palabra sin la letra e (o E)   
    let reg = /^ca+r?|t$/;
    console.log(reg.test("car"));
    console.log(reg.test("cat"));

    reg = /^[por]{3,4}$/;
    console.log(reg.test("pop"));
    console.log(reg.test("prop"));

    reg = /^ferr[eytari]{2,}$/;
    console.log(reg.test("ferret"));
    console.log(reg.test("ferrary"));
    console.log(reg.test("ferrari"));
    
    reg = /^.*ious$/;
    console.log(reg.test("ferret           7 ious"));
    console.log(reg.test("ferrary oijtfgious"));
    console.log(reg.test("ferrariious"));

    reg = /\s\W+/;
    console.log(reg.test(" .,.."));
    console.log(reg.test(" .,;"));

    reg = /[a-z]{6,}/i;
    console.log(reg.test("hkjjihuoihjfthoitu"));
    console.log(reg.test("kjdfrgkjfghkj"));
    
    reg = /e|E/;
    console.log(!reg.test("hkjjihEuoihjfthoitu"));
*/