import { Tarefa } from './tarefa/tarefa.js'

const bruno = new Tarefa("Fazer lição", "Bruno, você é chato");

class Main {
    static formCreateTarefa = document.querySelector('[data-form-criar-tarefa]') as HTMLFormElement;
    static inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]') as HTMLInputElement;
    static textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]') as HTMLTextAreaElement;
    static btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]') as HTMLButtonElement;
    static listaTarefas = document.querySelector('[data-tarefas-criadas]') as HTMLUListElement;

    constructor() {
        this.iniciar();
    }
    
    iniciar() {
        this.desabilitarButton();
        this.escutarEvento();
    }

    criarTarefa(e: Event) {
        const tarefaTitle = Main.inputCreateTarefa.value;
        const tarefaDescricao = Main.textareaCreateTarefa.value;
        const camposPreenchidos = (Boolean(tarefaTitle.length) && Boolean(tarefaDescricao.length));
        
        camposPreenchidos ? this.habilitarButton() : this.desabilitarButton();
    }
    
    escutarEvento() {
        Main.formCreateTarefa?.addEventListener("input", (e) => this.criarTarefa(e));
    
        Main.formCreateTarefa?.addEventListener("submit", (e) => {
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

new Main();