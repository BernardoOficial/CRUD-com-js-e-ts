import { Tarefa } from '../tarefa/tarefa.js'

class LocalStorageTarefas {

    static getItem(item: string | undefined): Tarefa[] {
        if(item === undefined) {
            throw new Error('Nome do item no LocalStorage não informado');
        }
        const tarefas: string | undefined | null = localStorage.getItem(item);
        return tarefas ? JSON.parse(tarefas) : undefined;
    }

    static setItem(name: string, item: Tarefa[]) {
        localStorage.setItem(name, JSON.stringify(item));
    }
}

export {
    LocalStorageTarefas
}