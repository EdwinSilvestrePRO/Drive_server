import { createReadStream } from 'node:fs';

const readStreamOfFile = createReadStream("./index.html");

let count = 1;

readStreamOfFile.addListener("readable", function (){
	let read = null;
	while (null !== (read = this.read()))
		console.log(read.toString());
});




// process.exit();

// readStreamOfFile
// .addListener("ready", function () {
// 	console.log(`the execution event ${count++} ready`);
// 	this
// 	.on("resume", ()=> console.log(`the execution event ${count++} resume`))
// 	.on("data", chunk=> console.log(`the execution event ${count++} data`))
// 	.on("close", ()=> console.log(`the execution event ${count++} close`))
// 	.on("pause", ()=> console.log(`the execution event ${count++} pause`)) // no exec...
// 	.on("end", ()=> console.log(`the execution event ${count++} end`));
// 	readStreamOfFile.pause() == null
// })
// .on("open", ()=> console.log(`the execution event ${count++} open`)) // no exec..
// .on("error", console.error);
