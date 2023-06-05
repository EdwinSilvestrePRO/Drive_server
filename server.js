import http from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import fs from 'node:fs/promises';
import FS,{ createReadStream } from 'node:fs';
import { sep, extname } from 'node:path';

process.title = "Servicio de recursos binarios";

const SERVER = http.createServer(webServer);
const missing = new Set();
async function webServer (request, response) {
	request.url = decodeURI(request.url);
	try {
		let headersBasic = JSON.parse(await fs.readFile("./Sources/mimetypeList.json"));
		function getTypeFile (formatActual) {
			for (let value of headersBasic) {
				if(formatActual.toLowerCase() == value.format)
					return value;
			}
			return {
				contyp: "application/octet-stream",
				format: formatActual
			}
		}
		let actual = `.${sep}Sources`;

		if ((/\/{2,}|\\{2,}/).test(request.url)) {
			response.statusMessage = http.STATUS_CODES[ response.statusCode = 406];
			const message = Buffer.from(`
				<h1>${response.statusMessage}</h1>
				<p style="font: bold 2.5em normal">No existe el acceso a ${request.url}. <br>Evite repetir barras para no obtener este mensage</p>
				`);
			response.setHeader("content-type", "text/html");
			response.setHeader("date", new Date());
			response.setHeader("content-length", message.byteLength);
			response.setHeader("Server", "Nodejs");
			response.write(message);
			response.end();
		}
		else if(request.url == "/favicon.ico") {
			const loadIcon = createReadStream(`.${sep}favicon.png`),
			{ birthtime } = await fs.stat(loadIcon.path);
			response.statusCode = 200;
			response.statusMessage = "OK";
			response.setHeader("content-type", "image/png");
			response.setHeader("date", birthtime);
			loadIcon.pipe(response);
		}
		else if (request.url == "/front-end.js") {
			const loadScript = createReadStream(`.${sep}front-end.js`),
			{ birthtime } = await fs.stat(loadScript.path);
			response.statusCode = 200;
			response.statusMessage = "OK script";
			response.setHeader("content-type", "application/javascript");
			response.setHeader("date", birthtime);
			loadScript.pipe(response);
		}
		else if (request.method == 'CHECKOUT') {
			if (request.headers['sec-fetch-mode'] == "same-origin") 
				missing.clear();
			else {}
			await delay(500);
			// Enviar la lista de elementos del directorio de servisios.
			const countLoad = 14,
			dirReaded = await fs.readdir(`./Sources/${request.url}`),
			elementsOfDir = dirReaded.filter(el => !missing.has(el));
			
			const dirForSend = [];
			let loads = 1;
			for (let value of elementsOfDir) {
				let statOfValue = await fs.stat(`./Sources${request.url}/${value}`);
				missing.add(value);

				let typeFile = getTypeFile(extname(value));
				dirForSend.push({
					modifiedTime: statOfValue.mtime,
					birthTime: statOfValue.birthtime,
					name: value,
					type: statOfValue.isFile()
				});
				
				if(loads >= countLoad)
					break;

				else 
					loads++;			
			}
			let jsonContent = JSON.stringify(dirForSend),
			{ byteLength } = Buffer.from(jsonContent),
			isFinish = missing.size == dirReaded.length;
			
			if (isFinish)
				response.statusMessage = 'OK';
			else
				response.statusMessage = 'Continue';
				
			response.setHeader("content-type", request.headers.accept);
			response.setHeader("content-length", byteLength);
			response.setHeader("date", new Date());
			response.write(jsonContent);
			response.end();
		}
		else if (request.method == "GET") {
					const loadVoid = createReadStream(`.${sep}void.html`);

					const dir = await fs.opendir(actual);
					dir.close();

					const dirLevels = [
						{
							dir: await fs.readdir(actual),
							stringDir: actual,
							levelActual: 1,
							isFile: false
						}
					];
					const customDirOfURL = [];
					request.url.split('/').forEach(element=> {
						if(customDirOfURL.indexOf(element) === -1) 
							customDirOfURL.push(element);
						else {}
					});


					let level = 1;
					
					if (dirLevels[0].dir.length) {
						// Acceder a los recursos binarios.

						while (level <= customDirOfURL.length) {
							let index = level - 1;

							if(dirLevels[index] == undefined) {
								let oldIndex = index - 1;
								let oldLevel = dirLevels[oldIndex];

								if (oldLevel.isFile) throw new ReferenceError(`La dirección <i>${oldLevel.stringDir.replace(".", "")}</i> no es un direcctorio para acceder a otros elementos como ...<i>${request.url.replace(oldLevel.stringDir, "")}</i>`);
								else {

								}

								const DIR = `${oldLevel.stringDir}${sep}${customDirOfURL[index]}`;
								let statActual = await fs.stat(DIR);
								let level = {
									dir: await (()=> {
										if (statActual.isDirectory()) 
											return fs.readdir(DIR);
										else return null;
									})(),
									stringDir: DIR,
									levelActual: statActual.isFile()? oldLevel.levelActual : oldLevel.levelActual+1,
									isFile: statActual.isFile()
								}
								dirLevels.push(level);

							}
							else {}
							level++;
						}

						const lastLevel = dirLevels[(dirLevels.length - 1)];
						if(lastLevel.isFile) {
							// it's file...
							const fileStream = createReadStream(lastLevel.stringDir),
							{ birthtime } = await fs.stat(fileStream.path);
							let fmt = extname(fileStream.path);
							let { contyp } = getTypeFile(fmt);

							response.statusCode = 200;
							response.statusMessage = "OK";
							response.setHeader("content-type", contyp);
							response.setHeader("date", birthtime);
							fileStream.pipe(response);
						}
						else {
							const interfaceService = await fs.readFile(`.${sep}service-interface.html`),
							content = interfaceService.toString("utf-8").replace("%cout-elements%", lastLevel.dir.length).replace("%dir-actual%", request.url),
							{ birthtime } = await fs.stat(`.${sep}service-interface.html`);
							response.statusCode = 200;
							response.statusMessage = "Interface Services";
							response.setHeader("content-type", "text/html");
							response.setHeader("date", birthtime);
							response.write(content);
							response.end();
						}

					} else if (request.url !== "/") {
						let ivalidReferenceFile = await fs.readFile("./invalidReference.html");

						const ivalidReferenceContent = ivalidReferenceFile
						.toString("utf-8").replace("%code-error%", 404).replace("%dir-file%", request.url);

						response.statusCode = 404;
						response.statusMessage = `invalid reference`;
						response.setHeader("content-type", "text/html");
						response.setHeader("date", new Date());
						response.write(ivalidReferenceContent);
						response.end();
					}
					else {
						response.statusCode = 200;
						response.statusMessage = "show void";
						response.setHeader("content-type", "text/html");
						response.setHeader("date", new Date());
						loadVoid.pipe(response);
					}
				}
		}
		catch (error) {
			if (error.syscall == "opendir") {
				response.statusCode = 512;
				response.statusMessage = "Binary Servises not found";
				response.setHeader("content-type", "image/png");
				response.setHeader("date", new Date());
				const readStream = createReadStream("./error-open-dir.png");
				readStream.pipe(response);
				// environment
				console.log(`Error:\nEl direcctorio \n${error.path} no funciona.`);
			}
			else if (error.syscall == "stat") {
				const loadInvalidURL = await fs.readFile("./invalidReferenceURL.html");
				let content = loadInvalidURL
				.toString("utf-8").replace("%code-error%", 404).replace("%dir-file%", request.url);
				response.statusCode = 404;
				response.statusMessage = "URL Ivalid";
				response.setHeader("content-type", "text/html");
				response.setHeader("date", new Date());
				response.write(content);
				response.end();

			}
			else {
					const servErr = await fs.readFile(`.${sep}servError.htm`),
					content = servErr
					.toString("utf-8").replace("%code-error%", 409).replace("%message%", error.message);
					response.statusMessage = http.STATUS_CODES[response.statusCode = 409];
					response.setHeader("content-type", "text/html");
					response.setHeader("date", new Date());
					response.write(content);
					response.end();
			}
	}
}

SERVER.listen(80, '127.9.9.9', async function () {
	const { address, port } = this.address();
	console.log(`Run server\n----------------------\nURL: http://${address}:${port}\r\ndate: ${new Date()}`);
});