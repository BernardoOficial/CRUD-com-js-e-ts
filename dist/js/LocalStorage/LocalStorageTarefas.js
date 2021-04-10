class LocalStorageTarefas {
    static getTarefas(item) {
        if (item === undefined) {
            throw new Error('Nome do item no LocalStorage não informado');
        }
        const tarefas = localStorage.getItem(item);
        return tarefas ? JSON.parse(tarefas) : undefined;
    }
    static setTarefas(name, item) {
        localStorage.setItem(name, JSON.stringify(item));
    }
    static getLastId() {
        const lastId = localStorage.getItem("lastId");
        return lastId ? JSON.parse(lastId) : undefined;
    }
    static setLastId(id) {
        localStorage.setItem("lastId", JSON.stringify(id));
    }
}
export { LocalStorageTarefas };
