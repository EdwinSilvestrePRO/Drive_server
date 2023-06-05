import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import Buffer from 'node:buffer';

export default class Question {
    #_position = 0;
    respoces = {}
    constructor (qs, callBack) { 
        this.callBack = callBack;
        this.setQuery(qs);
    }
    setQuery(questions) {
        const [name, question] = questions[this.#_position];
        process.stdout.write(question);
        process.stdin
        .addListener("data", 
        buff=> this.setResponse(name, buff, questions));
    }
    setResponse(name, buff, qs) {
        this.respoces[name] = buff.toString("utf8");
        if(this.#_position == (qs.length - 1)) {
            typeof this.callBack == "function"? this.callBack(this.respoces) : "nothing";
            return process.exit();
        }
        else {
            this.#_position++;
            process.stdin.removeAllListeners();
            return this.setQuery(qs);
        }
    }
}
export function orderNumbers (numbers) {
    let newMatriz = [];

    let isZero = matrizActual => !(matrizActual.length == 0);

    while ( isZero(numbers) ) {

        let indexOfSmall = null, min = null;
        
        for (let index = 0; index < numbers.length; index++) {
            if(min == null){
                indexOfSmall = index;
                min = numbers[index];
            }
            else if (numbers[index] < min) {
                min = numbers[index];
                indexOfSmall = index;
            }
            else ;
        }
        numbers = numbers.filter((value, index)=> index !== indexOfSmall);
        newMatriz.push(min);
    }

    return newMatriz;
}
export class AuthorError extends Error {
    constructor (Message, TargetSite, HelpLink, StackTrace) {
        super(Message);
        this['properties_C-sharp'] = {
            TargetSite,
            HelpLink,
            StackTrace
        }
    }
}
export async function DefaultAsserts () {
    function numeroPar (number) {
        const pred = (resolve, reject)=> {
            const buf = Buffer.from(`El número ${number} no es par, es primo.`, "utf-8");
            if(number % 2 !== 0) reject(new Error(buf.toString("utf-8")));
            else setTimeout(()=> resolve(`${number} % 2 === 0`), 0 | Math.random()*300);
        };
        return new Promise(pred);
    }
    const numbers = [];
    numbers[Symbol.asyncIterator] = function* () {
        for (let value of this) yield value;
    }
    for (let iteration = 2; iteration <= 50; iteration+=2)
        numbers.push(numeroPar(iteration));
    assert.ifError(null);
    for await (let value of numbers[Symbol.asyncIterator]()) 
        console.log(value);
    
    assert.rejects(()=> new Promise((resolve, reject)=> setTimeout(()=> reject(), 4000)))
    .then(()=> console.log("Sin Errores"))
    .catch(console.log);
}

export const Learn = {
    message: "486f7920566965726e6573203139206465206d61796f2064656c2061c3b16f20323032332c0a686520617072656e6e6469646f20736f6272652071756520736f6e206c6f73206275666572730a656e204e6f64654a7320717565206e6f73207065726d6974652074726162616a6172206461746f730a62696e6172696f7320636f6e206c6f6e67697475642065737461626c65636964612e0a0a486f79203230206465206d61796f20686520617072656e6469646f20736f6272652071756520736f6e206c6f7320426c6f620a656e206a6176617363726970742e0a",
    charCode: "hex"
}

export function getBufferOfFile (dirFile) {
    return new Promise ((resolve, reject)=> {
        try {
            const readStream = fs.createReadStream(dirFile);
            let buffer = null;
            
            readStream
            .on("close", ()=> resolve(buffer))
            .on("error", err=> reject(err))
            .on("data", chunk=> buffer = chunk)
            .on("end", ()=> buffer);
        } catch (err) {
            reject(err);
        }
    });
}