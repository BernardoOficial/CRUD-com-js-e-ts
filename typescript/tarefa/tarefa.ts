class Tarefa {
    titulo: string;
    descricao: string;

    constructor(titulo = "Sem título", descricao = "Sem descrição") {
        this.titulo = titulo;
        this.descricao = descricao;
    }
}

export {
    Tarefa
}