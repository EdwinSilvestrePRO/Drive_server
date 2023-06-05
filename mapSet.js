const names = new Set (["description", "age", "color", "city", "planet", "material", "number", "device", "sex"]);
const values = new Set(["Este es mi objeto Map", 17, "Purple", "Dominican Republic", "Earth", "Cera", 155n, "Laptop American Megatrends", "man"]);

const unified = [];
    
const [namesIterator, valuesIterator] = [names.values(), values.values()];

let [{done, value}, valueComplement] = [namesIterator.next(), valuesIterator.next()];

while(!done) {
    unified.push([
        value,
        valueComplement.value
    ]);
    // Refresh Data...
    [{done, value}, valueComplement] = [namesIterator.next(), valuesIterator.next()];
}

const map = new Map([...unified, ["name", "Neverneit"] ]);

// Para insertar hay que utilizar el método set (Map).

/* map.set("color", "Purple");
map.set("age", 17);
map.set("description", "Este es mi objeto Map"); */

// console.log(map);
// Para Obtener debo de utilizar el método get (Map).
// console.log(map);

// Para obtener a todos debo de utilizar el método entries (Map).
for (let [name, value] of map.entries())
    console.log(name, value);