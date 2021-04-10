import { LocalStorageTarefas } from './LocalStorage/LocalStorageTarefas.js';
import { Tarefa } from './tarefa/tarefa.js'

class Main {
    static formCreateTarefa = document.querySelector('[data-form-criar-tarefa]') as HTMLFormElement;
    static inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]') as HTMLInputElement;
    static textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]') as HTMLTextAreaElement;
    static btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]') as HTMLButtonElement;
    static listaTarefas = document.querySelector('[data-tarefas-criadas]') as HTMLUListElement;
    static tarefas: Tarefa[] = LocalStorageTarefas.getItem('tarefas');

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
        })
    }
    
    escutarEvento() {
        Main.formCreateTarefa?.addEventListener("input", (e) => this.handleButtonForm());
    
        Main.formCreateTarefa?.addEventListener("submit", (e) => {
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

new Main();