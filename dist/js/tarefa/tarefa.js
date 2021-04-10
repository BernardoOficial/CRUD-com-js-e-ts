import { LocalStorageTarefas } from "../LocalStorage/LocalStorageTarefas.js";
class Tarefa {
    constructor(titulo = "Sem título", descricao = "Sem descrição") {
        this.id = Tarefa.lastId;
        this.titulo = titulo;
        this.descricao = descricao;
        LocalStorageTarefas.setLastId(++Tarefa.lastId);
    }
}
Tarefa.lastId = LocalStorageTarefas.getLastId() || 0;
export { Tarefa };
