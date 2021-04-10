class Tarefa {
    constructor(titulo = "Sem título", descricao = "Sem descrição") {
        this.id = Tarefa.ids;
        this.titulo = titulo;
        this.descricao = descricao;
        Tarefa.ids++;
    }
}
Tarefa.ids = 0;
export { Tarefa };
