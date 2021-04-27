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
        const novaTarefa = new Tarefa(tarefaTitle, tarefaDescricao);
        Main.tarefas.push(novaTarefa);
        LocalStorageTarefas.setTarefas('tarefas', Main.tarefas);
        this.listarTarefas();
    }
    listarTarefas() {
        const tarefas = LocalStorageTarefas.getTarefas('tarefas');
        if (tarefas === undefined) {
            return;
        }
        Main.listaTarefas.innerHTML = "";
        tarefas.forEach(tarefa => Main.listaTarefas.innerHTML += this.criarCard(tarefa));
    }
    criarCard(tarefa) {
        return `
                <div class="card" data-card=${tarefa.id}>
                    <div class="card-header bg-dark text-white">
                        ${tarefa.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tarefa.descricao}</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar-tarefa" data-btn-editar=${tarefa.id}>Editar</button>
                    </div>
                </div>
            `;
    }
    escutarEvento() {
        var _a, _b, _c, _d;
        (_a = Main.formCreateTarefa) === null || _a === void 0 ? void 0 : _a.addEventListener("input", () => this.handleButtonForm());
        (_b = Main.formCreateTarefa) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", e => {
            e.preventDefault();
            this.criarTarefa();
        });
        (_c = Main.listaTarefas) === null || _c === void 0 ? void 0 : _c.addEventListener('click', e => {
            const elementoClicado = e.target;
            const numCard = Number(elementoClicado.dataset.btnEditar);
            if (numCard || numCard === 0) {
                Main.currentlyEditedTask = numCard;
                this.editarTarefa(Main.currentlyEditedTask);
            }
        });
        (_d = Main.btnUpdateTarefa) === null || _d === void 0 ? void 0 : _d.addEventListener('click', e => {
            this.salvarEdicao(Main.currentlyEditedTask);
        });
    }
    editarTarefa(id) {
        const tarefaSelecionada = Main.tarefas[id];
        console.log(tarefaSelecionada);
        Main.inputUptadeTarefa.value = tarefaSelecionada.titulo;
        Main.textareaUptadeTarefa.value = tarefaSelecionada.descricao;
    }
    salvarEdicao(id) {
        const tarefaAlterada = {
            id,
            titulo: Main.inputUptadeTarefa.value,
            descricao: Main.textareaUptadeTarefa.value
        };
        Main.tarefas[id] = tarefaAlterada;
        LocalStorageTarefas.setTarefas('tarefas', Main.tarefas);
        this.listarTarefas();
    }
    desabilitarButton() {
        Main.btnCreateTarefa.setAttribute('disabled', "");
    }
    habilitarButton() {
        Main.btnCreateTarefa.removeAttribute('disabled');
    }
}
// Elementos HTML
Main.formCreateTarefa = document.querySelector('[data-form-criar-tarefa]');
Main.inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]');
Main.textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]');
Main.btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]');
Main.listaTarefas = document.querySelector('[data-tarefas-criadas]');
Main.inputUptadeTarefa = document.querySelector('[data-input-update-tarefa]');
Main.textareaUptadeTarefa = document.querySelector('[data-textarea-uptade-tarefa]');
Main.btnUpdateTarefa = document.querySelector('[data-btn-uptade-tarefa]');
Main.tarefas = LocalStorageTarefas.getTarefas('tarefas') || [];
new Main();
