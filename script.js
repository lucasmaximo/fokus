const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const imagemIniciarPausar = document.querySelector('.app__card-primary-button-icon');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const timer = document.querySelector('#timer');

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');

musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

//quando clico no botão de foco o elemento data-contexto do seletor html passa a ter o valor foco
focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

//quando clico no botão de descanso curto o elemento data-contexto do seletor html passa a ter o valor descanso-curto
curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});

//quando clico no botão de descanso longo o elemento data-contexto do seletor html passa a ter o valor descanso-longo
longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

//função que altera o contexto da tela
function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(contexto => {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 
            `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = 
            `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = 
            `Hora de voltar à superfície<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
    
}

//quando clico no botão de começar/pausar ele chama a função iniciarOuPausar
startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    //Se intervaloId tiver algum valor, chama a função zerar e força o encerramento da função
    if (intervaloId) {
        pause.play();
        zerar();
        return;
    }
    //Se intervaloId for nulo, ele recebe um valor e manterá a execução do loop até que ele seja parado com clearInterval
    //esse valor será usado para encerrar a execução posteriormente com clearInterval
    //chama a função contagemRegressiva repetidamente a cada 1 segundo, até ser parada com clearInterval
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    imagemIniciarPausar.setAttribute('src', '/imagens/pause.png');
    iniciarOuPausarBtn.textContent = 'Pausar';
}

function zerar() {
    //interrompe a execução da função atrelada ao intervaloId
    clearInterval(intervaloId);
    imagemIniciarPausar.setAttribute('src', '/imagens/play_arrow.png');
    iniciarOuPausarBtn.textContent = 'Começar';
    //atribui o valor nulo ao intervaloId
    intervaloId = null;
    //o tempoDecorridoEmSegundos não é zerado, por isso ele continua de onde parou quando a contagem é reiniciada
}

//executa uma contagem regressiva de 1 em 1 segundo, até que o valor seja 0
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit' });
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();