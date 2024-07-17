const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

//o array de tarefas recupera os itens armazenados como tipo tarefas no localStorage
//se não tiver nada para ser recuperado, o array tarefas é iniciado como vazio 
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

//estruturação da criação do elemento li dentro da lista de tarefas que aparece na tela
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `;
    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');
        console.log('Nova descrição da tarefa: ', novaDescricao);
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas(); 
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');

    //criando o chaveamento dos elementos dentro do li
    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active');
        });
        if (tarefaSelecionada === tarefa) {
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }
        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        li.classList.add('app__section-task-list-item-active');
    };

    return li;
}

//ao clicar no botão adicionar tarefa o formulário deixa de ter a classe hidden e aparece para o usuário
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    //impede o comportament padrão do navegador de recarregar a página quando submeto um form
    evento.preventDefault();

    //cria um objeto do tipo tarefa com um atributo descricao que recebe o valor do campo textArea
    const tarefa = {
        descricao: textArea.value
    };
    //adiciona o objeto tarefa recém-criado dentro do array de tarefas
    tarefas.push(tarefa);
    //cria o elemento tafera com os dados da tarefa e o armazena em uma variável
    const elementoTarefa = criarElementoTarefa(tarefa);
    //o elemento recém-criado é adicionado na lista que aparece na tela do usuário
    ulTarefas.append(elementoTarefa);
    //armazena o objeto no localStorage consumindo uma API JSON que converte o objeto em strings
    //essas strings podem ser recuperadas posteriormente para manipulação 
    atualizarTarefas(tarefas);
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

//exibe a lista de tarefas armazenadas no DOM na tela do usuário
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

const limparFormulario = () => {
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
}

btnCancelar.addEventListener('click', limparFormulario);


document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
    }
})