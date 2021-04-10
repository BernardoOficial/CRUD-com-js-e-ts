import { LocalStorageTarefas } from './LocalStorage/LocalStorageTarefas.js';
import { Tarefa } from './tarefa/tarefa.js';
class Main {
    constructor() {
        this.iniciar();
    }
    iniciar() {
        this.desabilitarButton();
        this.escutarEvento();
        this.listarTarefas();
    }
    handleButtonForm() {
        const tarefaTitle = Main.inputCreateTarefa.value;
        const tarefaDescricao = Main.textareaCreateTarefa.value;
        const camposPreenchidos = (Boolean(tarefaTitle.length) && Boolean(tarefaDescricao.length));
        camposPreenchidos ? this.habilitarButton() : this.desabilitarButton();
    }
    criarTarefa() {
        const tarefaTitle = Main.inputCreateTarefa.value;
        const tarefaDescricao = Main.textareaCreateTarefa.value;
        const camposPreenchidos = (Boolean(tarefaTitle.length) && Boolean(tarefaDescricao.length));
        const novaTarefa = new Tarefa(tarefaTitle, tarefaDescricao);
        Main.tarefas.push(novaTarefa);
        LocalStorageTarefas.setItem('tarefas', Main.tarefas);
        this.listarTarefas();
    }
    listarTarefas() {
        const tarefas = LocalStorageTarefas.getItem('tarefas');
        tarefas.forEach(tarefa => {
            Main.listaTarefas.innerHTML += `<li>${tarefa.id} - ${tarefa.titulo} || ${tarefa.descricao}</li>`;
        });
    }
    escutarEvento() {
        var _a, _b;
        (_a = Main.formCreateTarefa) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (e) => this.handleButtonForm());
        (_b = Main.formCreateTarefa) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (e) => {
            e.preventDefault();
            this.criarTarefa();
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
Main.tarefas = LocalStorageTarefas.getItem('tarefas');
new Main();
