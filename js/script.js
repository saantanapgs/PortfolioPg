// =========================================================
// PORTFÓLIO | PEDRO SANTANA
// 1. Tema claro/escuro   2. Menu (celular)   3. Carrossel
// 4. Barras de skills    5. Formulário       6. Ano do rodapé
// =========================================================

// E-mail que vai receber as mensagens do formulário
const EMAIL_DESTINO = 'rpggustavo56@gmail.com';


// ---------- 1. TEMA CLARO / ESCURO ----------
const btnTema = document.querySelector('#btnTema');

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-tema', tema);

    if (tema === 'claro') {
        btnTema.setAttribute('aria-label', 'Ativar modo escuro');
    } else {
        btnTema.setAttribute('aria-label', 'Ativar modo claro');
    }

    // Salva a escolha (try/catch evita erro se o navegador bloquear o armazenamento)
    try {
        localStorage.setItem('tema', tema);
    } catch (erro) {}
}

// Ajusta o botão de acordo com o tema que já estava ativo ao abrir a página
if (document.documentElement.getAttribute('data-tema') === 'claro') {
    btnTema.setAttribute('aria-label', 'Ativar modo escuro');
}

btnTema.addEventListener('click', function () {
    const temaAtual = document.documentElement.getAttribute('data-tema');

    if (temaAtual === 'claro') {
        aplicarTema('escuro');
    } else {
        aplicarTema('claro');
    }
});


// ---------- 2. MENU (CELULAR) ----------
const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('#menu');

function fecharMenu() {
    menu.classList.remove('aberto');
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.setAttribute('aria-label', 'Abrir menu');
}

btnMenu.addEventListener('click', function () {
    const estaAberto = menu.classList.toggle('aberto');
    btnMenu.setAttribute('aria-expanded', String(estaAberto));
    btnMenu.setAttribute('aria-label', estaAberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', fecharMenu);
});

// Fecha o menu com a tecla Esc
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
        fecharMenu();
    }
});


// ---------- 3. CARROSSEL DE PROJETOS ----------
const carrossel = document.querySelector('#carrossel');
const cards = document.querySelectorAll('.card-projeto');
const btnAnterior = document.querySelector('#btnAnterior');
const btnProximo = document.querySelector('#btnProximo');
const contador = document.querySelector('#contadorProjetos');

let atual = 0; // posição do card que está no meio

function mostrarCards() {
    const total = cards.length;
    const anterior = (atual - 1 + total) % total;
    const proximo = (atual + 1) % total;

    cards.forEach(function (card, i) {
        card.classList.remove('ativo', 'lateral', 'oculto');

        if (i === atual) {
            card.classList.add('ativo');
            card.style.order = 1;
        } else if (i === anterior) {
            card.classList.add('lateral');
            card.style.order = 0;
        } else if (i === proximo) {
            card.classList.add('lateral');
            card.style.order = 2;
        } else {
            card.classList.add('oculto');
        }
    });

    contador.textContent = 'Projeto ' + (atual + 1) + ' de ' + total;
}

function irParaProximo() {
    atual = (atual + 1) % cards.length;
    mostrarCards();
}

function irParaAnterior() {
    atual = (atual - 1 + cards.length) % cards.length;
    mostrarCards();
}

btnProximo.addEventListener('click', irParaProximo);
btnAnterior.addEventListener('click', irParaAnterior);

// Clicar num card lateral traz ele para o meio (em vez de abrir o link)
cards.forEach(function (card, i) {
    card.addEventListener('click', function (evento) {
        if (!card.classList.contains('ativo')) {
            evento.preventDefault();
            atual = i;
            mostrarCards();
        }
    });
});

// Setas do teclado quando o foco está dentro do carrossel
carrossel.addEventListener('keydown', function (evento) {
    if (evento.key === 'ArrowRight') {
        irParaProximo();
    } else if (evento.key === 'ArrowLeft') {
        irParaAnterior();
    }
});

// Deslizar o dedo no celular
let inicioToque = 0;

carrossel.addEventListener('touchstart', function (evento) {
    inicioToque = evento.changedTouches[0].clientX;
});

carrossel.addEventListener('touchend', function (evento) {
    const fimToque = evento.changedTouches[0].clientX;
    const diferenca = fimToque - inicioToque;

    if (diferenca < -50) {
        irParaProximo();
    } else if (diferenca > 50) {
        irParaAnterior();
    }
});

mostrarCards();


// ---------- 4. BARRAS DE SKILLS ----------
const listaSkills = document.querySelector('#listaSkills');
const barras = document.querySelectorAll('.barra-preenchida');

function preencherBarras() {
    barras.forEach(function (barra) {
        barra.style.width = barra.dataset.nivel + '%';
    });
}

// Preenche as barras quando a seção aparece na tela
if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                preencherBarras();
                observador.disconnect();
            }
        });
    }, { threshold: 0.2 });

    observador.observe(listaSkills);
} else {
    preencherBarras();
}


// ---------- 5. FORMULÁRIO DE CONTATO ----------
const formulario = document.querySelector('#formContato');
const campoNome = document.querySelector('#nome');
const campoEmail = document.querySelector('#email');
const campoMensagem = document.querySelector('#mensagem');
const statusForm = document.querySelector('#statusForm');

function mostrarErro(campo, texto) {
    document.querySelector('#erro' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)).textContent = texto;
    campo.classList.add('invalido');
    campo.setAttribute('aria-invalid', 'true');
}

function limparErro(campo) {
    document.querySelector('#erro' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)).textContent = '';
    campo.classList.remove('invalido');
    campo.removeAttribute('aria-invalid');
}

// Cada função devolve true (campo ok) ou false (campo com problema)
function validarNome() {
    const valor = campoNome.value.trim();

    if (valor === '') {
        mostrarErro(campoNome, 'Por favor, informe seu nome.');
        return false;
    }
    if (valor.length < 3) {
        mostrarErro(campoNome, 'O nome deve ter pelo menos 3 caracteres.');
        return false;
    }

    limparErro(campoNome);
    return true;
}

function validarEmail() {
    const valor = campoEmail.value.trim();
    const modeloEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (valor === '') {
        mostrarErro(campoEmail, 'Por favor, informe seu e-mail.');
        return false;
    }
    if (!modeloEmail.test(valor)) {
        mostrarErro(campoEmail, 'Digite um e-mail válido, como nome@exemplo.com.');
        return false;
    }

    limparErro(campoEmail);
    return true;
}

function validarMensagem() {
    const valor = campoMensagem.value.trim();

    if (valor === '') {
        mostrarErro(campoMensagem, 'Por favor, escreva sua mensagem.');
        return false;
    }
    if (valor.length < 10) {
        mostrarErro(campoMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
        return false;
    }

    limparErro(campoMensagem);
    return true;
}

// Valida cada campo assim que a pessoa sai dele
campoNome.addEventListener('blur', validarNome);
campoEmail.addEventListener('blur', validarEmail);
campoMensagem.addEventListener('blur', validarMensagem);

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede a página de recarregar
    statusForm.textContent = '';

    // Roda as três validações (sem parar na primeira que falhar)
    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const mensagemOk = validarMensagem();

    if (!nomeOk || !emailOk || !mensagemOk) {
        // Leva o foco para o primeiro campo com erro
        if (!nomeOk) {
            campoNome.focus();
        } else if (!emailOk) {
            campoEmail.focus();
        } else {
            campoMensagem.focus();
        }
        return;
    }

    // Tudo certo: monta o e-mail e abre o aplicativo de e-mail da pessoa
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();

    const assunto = 'Contato pelo portfólio - ' + nome;
    const corpo = mensagem + '\n\nNome: ' + nome + '\nE-mail: ' + email;

    const link = 'mailto:' + EMAIL_DESTINO +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);

    formulario.reset();
    statusForm.textContent = 'Mensagem pronta! Seu aplicativo de e-mail foi aberto para concluir o envio.';
    window.location.href = link;
});

// Botão "Limpar": apaga também os erros e a mensagem de status
formulario.addEventListener('reset', function () {
    limparErro(campoNome);
    limparErro(campoEmail);
    limparErro(campoMensagem);
    statusForm.textContent = '';
});


// ---------- 6. ANO DO RODAPÉ ----------
document.querySelector('#anoAtual').textContent = new Date().getFullYear();
