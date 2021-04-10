class Tarefa {
    
    static ids = 0;

    id: number;
    titulo: string;
    descricao: string;

    constructor(titulo = "Sem título", descricao = "Sem descrição") {
        this.id = Tarefa.ids;
        this.titulo = titulo;
        this.descricao = descricao;

        Tarefa.ids++;
    }
}

export {
    Tarefa
}