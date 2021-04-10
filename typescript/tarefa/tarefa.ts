import { LocalStorageTarefas } from "../LocalStorage/LocalStorageTarefas.js";

class Tarefa {
    
    static lastId = LocalStorageTarefas.getLastId() || 0;

    id: number;
    titulo: string;
    descricao: string;

    constructor(titulo = "Sem título", descricao = "Sem descrição") {
        this.id = Tarefa.lastId;
        this.titulo = titulo;
        this.descricao = descricao;

        LocalStorageTarefas.setLastId(++Tarefa.lastId);
    }
}

export {
    Tarefa
}