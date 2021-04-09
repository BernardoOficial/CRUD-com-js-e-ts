import { Tarefa } from './tarefa/tarefa.js';
const bruno = new Tarefa("Fazer lição", "Bruno, você é chato");
class Main {
    constructor() {
        this.iniciar();
    }
    iniciar() {
        this.desabilitarButton();
        this.escutarEvento();
    }
    criarTarefa(e) {
        const tarefaTitle = Main.inputCreateTarefa.value;
        const tarefaDescricao = Main.textareaCreateTarefa.value;
        const camposPreenchidos = (Boolean(tarefaTitle.length) && Boolean(tarefaDescricao.length));
        camposPreenchidos ? this.habilitarButton() : this.desabilitarButton();
    }
    escutarEvento() {
        var _a, _b;
        (_a = Main.formCreateTarefa) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (e) => this.criarTarefa(e));
        (_b = Main.formCreateTarefa) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    }
    desabilitarButton() {
        Main.btnCreateTarefa.setAttribute('disabled', "");
    }
    habilitarButton() {
        Main.btnCreateTarefa.removeAttribute('disabled');
    }
}
Main.formCreateTarefa = document.querySelector('[data-form-criar-tarefa]');
Main.inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]');
Main.textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]');
Main.btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]');
Main.listaTarefas = document.querySelector('[data-tarefas-criadas]');
new Main();
