class LocalStorageTarefas {
    static getItem(item) {
        if (item === undefined) {
            throw new Error('Nome do item no LocalStorage não informado');
        }
        const tarefas = localStorage.getItem(item);
        return tarefas ? JSON.parse(tarefas) : undefined;
    }
    static setItem(name, item) {
        localStorage.setItem(name, JSON.stringify(item));
    }
}
export { LocalStorageTarefas };
