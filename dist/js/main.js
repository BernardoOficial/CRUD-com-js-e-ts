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
        const parser = new DOMParser();
        Main.listaTarefas.innerHTML = "";
        tarefas.forEach(tarefa => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.setAttribute('type', 'button');
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#editar-tarefa');
            button.setAttribute('data-id', `${tarefa.id}`);
            button.textContent = 'Editar';
            button.addEventListener('click', () => console.log('me clicou'));
            Main.listaTarefas.innerHTML =
                `
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            ${tarefa.titulo}
                        </div>
                        <div class="card-body">
                            <p class="card-text">${tarefa.descricao}</p>
                            ${parser.parseFromString(JSON.stringify(button), "text/html")}
                        </div>
                    </div>
                `;
            console.log(button);
            const htmlString = "<strong>Beware of the leopard</strong>";
            const doc3 = parser.parseFromString(htmlString, "text/html");
            // HTMLDocument
            // Main.listaTarefas.appendChild(card);
            // <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar-tarefa">Editar</button>
        });
    }
    escutarEvento() {
        var _a, _b;
        (_a = Main.formCreateTarefa) === null || _a === void 0 ? void 0 : _a.addEventListener("input", () => this.handleButtonForm());
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
Main.tarefas = LocalStorageTarefas.getTarefas('tarefas') || [];
new Main();
