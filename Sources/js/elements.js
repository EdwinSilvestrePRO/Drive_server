export default class ServiceInterface extends Object {
    #loading = "Carcando...";
    #load = "Cargar";
    #week = ["Sonday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    get Loading () {
        return this.#loading;
    }
    get context () {
        return this;
    }
    constructor ($tbody, $templateViewMessage, $templateViewElements, $loadElements) {
        super();
        this.$tbody = $tbody;
        this.$templateViewMessage = $templateViewMessage;
        this.$templateViewElements = $templateViewElements;
        this.$loadElements = $loadElements;
    }
    static Main ({ timeStamp }) {
        const interfaceService = new ServiceInterface(
            document.getElementById("content-elements"),
            document.getElementById("view-message"),
            document.getElementById("@interface-source"),
            document.getElementById("load-content")
        );

        setTimeout(interfaceService.dispatchElements.bind(interfaceService), timeStamp);

        return interfaceService;
    }
    dispathEnable () {
        let enableEvent = new CustomEvent("enabled", {
            bubbles: true,
            cancelable: true
        });
        this.$loadElements.dispatchEvent(enableEvent);
    }
    async dispatchElements (mode = "same-origin") {
        try {
            const response = await fetch(window.location.href, {
                method: "CHECKOUT",
                mode,
                cache: "default",
                headers: [
                    ["accept", "application/json"],
                    ["accept-encoding", "gzip, deflate, br"],
                    ["date", new Date()],
                    ["accept-language", "es-Es, en"],
                ],
            });
            
            const dirInform = await response.json();
            
            const { $tbody, $templateViewElements, $loadElements } = this,
            // Este es el fragmento que está definido contendrá a todas las filas.
            $fragment = document.createDocumentFragment();
            let { pathname } = window.location;

            for (let { name, type, modifiedTime, birthTime } of dirInform) {
                // Declarando elementos de la fila:
                let $a = $templateViewElements.content.querySelector("a"),
                $type = $templateViewElements.content.querySelector("td.type"),
                $birthTime = $templateViewElements.content.querySelector("td.birthtime"),
                $modifiedTime = $templateViewElements.content.querySelector("td.modifiedTime");
                $a.href = `${pathname}${/\\|\//.test(pathname[pathname.length-1])? "" : "/"}${name}`;
                $a.textContent = name;
                $type.textContent = type? "File":"Dir";
                // Declaración de las fechas.
                let [ date1, date2 ] = [new Date(birthTime), new Date(modifiedTime)];
                let isGt = date1.getHours() > 12;
                $birthTime.textContent = `${this.#week[date1.getDay()]} ${date1.getDate()}/${date1.getMonth()}/${date1.getFullYear()}\n${isGt? date1.getHours() - 12 : date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()} ${isGt? "Pm" : "Am"}`;
                isGt = date2.getHours() > 12;
                $modifiedTime.textContent = `${this.#week[date2.getDay()]} ${date2.getDate()}/${date2.getMonth()}/${date2.getFullYear()}\n${isGt? date2.getHours() - 12 : date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()} ${isGt? "Pm" : "Am"}`;
                $fragment.appendChild(document.importNode($templateViewElements.content, true));
            }

            $tbody.appendChild($fragment);

            if(response.status > 299) {
                let exeption = new Error(`${response.statusText} (${response.status}): ${response.url}`);
                exeption.type = "error";
                throw exeption;
            }
            else if (dirInform.length == 0) {
                const { $templateViewMessage, $tbody } = this;
                $templateViewMessage.content.querySelector("#to-message").textContent = "No hay Elementos";
                $templateViewMessage.content.querySelector("#to-message").className = "warn";
                const nodeLoaded = document.importNode($templateViewMessage.content, true);
                $tbody.appendChild(nodeLoaded);
                                
            }
            else if (response.statusText === "Continue") 
                this.dispathEnable();
            
            else {}
            
            $loadElements.classList.remove("load");
            $loadElements.textContent = this.#load;
        }
        catch (error) {
            const { $templateViewMessage, $tbody, $loadElements } = this;
            // Este es un bloque donde defino el mecanismo que muestra el error.
            $templateViewMessage.content.querySelector("#to-message").textContent = error.message;
            $templateViewMessage.content.querySelector("#to-message").className = error.type;
            // Importar los nodos.
            const nodeLoaded = document.importNode($templateViewMessage.content, true);
            $tbody.appendChild(nodeLoaded);
            
            $loadElements.classList.add("error");
        }
    }
}