import { LocalStorageTarefas } from './LocalStorage/LocalStorageTarefas.js';
import { Tarefa } from './tarefa/tarefa.js'

class Main {
    static formCreateTarefa = document.querySelector('[data-form-criar-tarefa]') as HTMLFormElement;
    static inputCreateTarefa = document.querySelector('[data-input-criar-tarefa]') as HTMLInputElement;
    static textareaCreateTarefa = document.querySelector('[data-textarea-criar-tarefa]') as HTMLTextAreaElement;
    static btnCreateTarefa = document.querySelector('[data-btn-criar-tarefa]') as HTMLButtonElement;
    static listaTarefas = document.querySelector('[data-tarefas-criadas]') as HTMLUListElement;

    static tarefas: Tarefa[] = LocalStorageTarefas.getTarefas('tarefas') || [];
    
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
                `
                
                console.log(button)

                const htmlString = "<strong>Beware of the leopard</strong>";
                const doc3 = parser.parseFromString(htmlString, "text/html");
                // HTMLDocument
                // Main.listaTarefas.appendChild(card);
                // <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar-tarefa">Editar</button>
            })
    }
    
    escutarEvento() {
        Main.formCreateTarefa?.addEventListener("input", () => this.handleButtonForm());
    
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