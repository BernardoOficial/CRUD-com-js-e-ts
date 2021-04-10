import { Tarefa } from '../tarefa/tarefa.js'

class LocalStorageTarefas {

    static getTarefas(item: string | undefined): Tarefa[] {
        if(item === undefined) {
            throw new Error('Nome do item no LocalStorage não informado');
        }
        const tarefas: string | undefined | null = localStorage.getItem(item);
        return tarefas ? JSON.parse(tarefas) : undefined;
    }

    static setTarefas(name: string, item: Tarefa[]) {
        localStorage.setItem(name, JSON.stringify(item));
    }

    static getLastId(): number {
        const lastId: string | undefined | null = localStorage.getItem("lastId");
        return lastId ? JSON.parse(lastId) : undefined;
    }

    static setLastId(id: number) {
        localStorage.setItem("lastId", JSON.stringify(id));
    }
}

export {
    LocalStorageTarefas
}