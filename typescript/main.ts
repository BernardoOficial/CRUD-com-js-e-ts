import { LocalStorageTarefas } from './LocalStorage/LocalStorageTarefas.js';
import { Tarefa } from './tarefa/tarefa.js'

class Main {

    // Elementos HTML
    static formCreateTarefa = document.querySelector('[data-form-criar-tarefa]') as HTMLFormElement;
    static inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]') as HTMLInputElement;
    static textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]') as HTMLTextAreaElement;
    static btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]') as HTMLButtonElement;
    static listaTarefas = document.querySelector('[data-tarefas-criadas]') as HTMLUListElement;
    static inputUptadeTarefa = document.querySelector('[data-input-update-tarefa]') as HTMLInputElement;
    static textareaUptadeTarefa = document.querySelector('[data-textarea-uptade-tarefa]') as HTMLTextAreaElement;
    static btnUpdateTarefa = document.querySelector('[data-btn-uptade-tarefa]') as HTMLButtonElement;

    static tarefas: Tarefa[] = LocalStorageTarefas.getTarefas('tarefas') || [];
    static currentlyEditedTask: number;
    
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
        if(tarefas === undefined) {
            return;
        }

        Main.listaTarefas.innerHTML = "";
        tarefas.forEach(tarefa => Main.listaTarefas.innerHTML += this.criarCard(tarefa));
    }

    criarCard(tarefa: { id: string | number, titulo: string, descricao: string} ) {
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
            `
    }
    
    escutarEvento() {
        Main.formCreateTarefa?.addEventListener("input", () => this.handleButtonForm());
    
        Main.formCreateTarefa?.addEventListener("submit", e => {
            e.preventDefault();
            this.criarTarefa();
        });

        Main.listaTarefas?.addEventListener('click', e => {
            const elementoClicado: any = e.target;
            const numCard = Number(elementoClicado.dataset.btnEditar);
            if(numCard || numCard === 0) {
                Main.currentlyEditedTask = numCard;
                this.editarTarefa(Main.currentlyEditedTask);
            }
        });

        Main.btnUpdateTarefa?.addEventListener('click', e => {
            this.salvarEdicao(Main.currentlyEditedTask);
        })
    }

    editarTarefa(id: number) {
        const tarefaSelecionada = Main.tarefas[id];
        console.log(tarefaSelecionada);
        
        Main.inputUptadeTarefa.value = tarefaSelecionada.titulo;
        Main.textareaUptadeTarefa.value = tarefaSelecionada.descricao;
    }

    salvarEdicao(id: number) {
        const tarefaAlterada: Tarefa = {
            id,
            titulo: Main.inputUptadeTarefa.value,
            descricao: Main.textareaUptadeTarefa.value
        }

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

new Main();