let matriz;
let scoreJogador = 0;
let scoreMaquina = 0;
let tamanhoMatriz = 5; // Padrão inicial
const numeroDeBarcos = 5; // Quantidade de barcos
let barcosAcertadosJogador = 0;
let barcosAcertadosMaquina = 0;
let tirosFeitos = new Set();

function iniciarJogo() {
    matriz = Array.from({ length: tamanhoMatriz }, () => Array(tamanhoMatriz).fill('agua'));
    barcosAcertadosJogador = 0;
    barcosAcertadosMaquina = 0;
    tirosFeitos.clear();
    posicionarBarcos();
    atualizarMatriz();
}

function posicionarBarcos() {
    let barcosColocados = 0;
    while (barcosColocados < numeroDeBarcos) {
        const i = Math.floor(Math.random() * tamanhoMatriz);
        const j = Math.floor(Math.random() * tamanhoMatriz);
        if (matriz[i][j] === 'agua') {
            matriz[i][j] = 'barco';
            barcosColocados++;
        }
    }
}

function atualizarMatriz() {
    const matrizDiv = document.getElementById('matriz');
    matrizDiv.innerHTML = '';
    for (let i = 0; i < tamanhoMatriz; i++) {
        for (let j = 0; j < tamanhoMatriz; j++) {
            const campo = document.createElement('div');
            campo.classList.add('campo');
            campo.addEventListener('click', () => atirar(i, j));
            matrizDiv.appendChild(campo);
        }
    }
}

function atirar(i, j) {
    const campo = document.querySelector(`#matriz div:nth-child(${i * tamanhoMatriz + j + 1})`);

    if (tirosFeitos.has(`${i}-${j}`)) {
        alert('Você já atirou aqui!');
        return;
    }

    tirosFeitos.add(`${i}-${j}`);

    if (matriz[i][j] === 'barco') {
        scoreJogador += 10;
        matriz[i][j] = 'agua';
        campo.classList.add('acertou');
        barcosAcertadosJogador++;
        alert('Você atingiu um barco!');
        verificarVitoria();
    } else {
        campo.classList.add('errou');
        alert('Tiro na água!');
        maquinaAtirar();
    }
    atualizarScore();
}

function maquinaAtirar() {
    let i, j;
    do {
        i = Math.floor(Math.random() * tamanhoMatriz);
        j = Math.floor(Math.random() * tamanhoMatriz);
    } while (tirosFeitos.has(`${i}-${j}`));

    tirosFeitos.add(`${i}-${j}`);
    const campo = document.querySelector(`#matriz div:nth-child(${i * tamanhoMatriz + j + 1})`);

    if (matriz[i][j] === 'barco') {
        scoreMaquina += 10;
        matriz[i][j] = 'agua';
        campo.classList.add('acertou');
        barcosAcertadosMaquina++;
        alert('A máquina atingiu um barco!');
    } else {
        campo.classList.add('errou');
        alert('A máquina errou o tiro!');
    }

    atualizarScore();
    verificarVitoria();
}

function verificarVitoria() {
    if (barcosAcertadosJogador === numeroDeBarcos) {
        alert('Você ganhou!');
        iniciarJogo();
    } else if (barcosAcertadosMaquina === numeroDeBarcos) {
        alert('A máquina ganhou!');
        iniciarJogo();
    }
}

function atualizarScore() {
    document.getElementById('scoreJogador').innerText = scoreJogador;
    document.getElementById('scoreMaquina').innerText = scoreMaquina;
    document.getElementById('score').style.display = 'block';
}

document.getElementById('facil').addEventListener('click', () => {
    alert('Nível Fácil selecionado!');
    tamanhoMatriz = 5;
    iniciarJogo();
});

document.getElementById('dificil').addEventListener('click', () => {
    alert('Nível Difícil selecionado!');
    tamanhoMatriz = 10;
    iniciarJogo();
});

document.getElementById('reiniciar').addEventListener('click', () => {
    scoreJogador = 0;
    scoreMaquina = 0;
    document.getElementById('score').style.display = 'none';
    iniciarJogo();
});

window.onload = iniciarJogo;
