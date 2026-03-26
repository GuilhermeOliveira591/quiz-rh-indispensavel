/* ========================================
   Fanelli Consultoria — Quiz Diagnóstico RH
   ======================================== */

const perguntas = [
  {
    texto: 'Quando um gestor traz um problema de equipe, você:',
    alternativas: [
      { texto: 'Escuta, orienta e sugere caminhos', pontos: 0 },
      { texto: 'Analisa comportamento, contexto e liderança', pontos: 1 },
      { texto: 'Traduz o problema em impacto na entrega e define ação com base nisso', pontos: 2 }
    ]
  },
  {
    texto: 'Hoje, você consegue provar o impacto do RH em números?',
    alternativas: [
      { texto: 'Não', pontos: 0 },
      { texto: 'Parcialmente, em alguns casos', pontos: 1 },
      { texto: 'Sim, consigo conectar com resultado e desempenho', pontos: 2 }
    ]
  },
  {
    texto: 'Em decisões importantes, sua presença acontece porque:',
    alternativas: [
      { texto: 'Você executa o que foi decidido', pontos: 0 },
      { texto: 'Você contribui quando chamam', pontos: 1 },
      { texto: 'Você influencia o que será decidido', pontos: 2 }
    ]
  },
  {
    texto: 'Quando você propõe uma ação de RH, você pensa primeiro:',
    alternativas: [
      { texto: 'No que vai melhorar o ambiente', pontos: 0 },
      { texto: 'No que faz sentido para as pessoas', pontos: 1 },
      { texto: 'No impacto que isso vai gerar no resultado da empresa', pontos: 2 }
    ]
  },
  {
    texto: 'Quando algo não funciona no time, você:',
    alternativas: [
      { texto: 'Tenta resolver com conversa e alinhamento', pontos: 0 },
      { texto: 'Ajusta processos e acompanha', pontos: 1 },
      { texto: 'Identifica causa, impacto no resultado e corrige com critério', pontos: 2 }
    ]
  },
  {
    texto: 'Hoje, você consegue sustentar uma decisão com o dono ou liderança sem recuar?',
    alternativas: [
      { texto: 'Evito conflito', pontos: 0 },
      { texto: 'Tento argumentar, mas nem sempre sustento', pontos: 1 },
      { texto: 'Sustento com base em impacto no negócio', pontos: 2 }
    ]
  },
  {
    texto: 'Seu trabalho hoje é mais reconhecido por:',
    alternativas: [
      { texto: 'Organização e execução', pontos: 0 },
      { texto: 'Apoio ao time e ambiente', pontos: 1 },
      { texto: 'Impacto real na performance da empresa', pontos: 2 }
    ]
  },
  {
    texto: 'Sobre cultura e clima, você hoje:',
    alternativas: [
      { texto: 'Cuida e acompanha', pontos: 0 },
      { texto: 'Tenta melhorar com ações', pontos: 1 },
      { texto: 'Conecta diretamente com produtividade e resultado', pontos: 2 }
    ]
  },
  {
    texto: 'Quando você fala de RH, sua linguagem é mais:',
    alternativas: [
      { texto: 'Pessoas, ambiente e bem-estar', pontos: 0 },
      { texto: 'Organização e desenvolvimento', pontos: 1 },
      { texto: 'Resultado, performance e impacto', pontos: 2 }
    ]
  },
  {
    texto: 'Hoje, se você sair da empresa:',
    alternativas: [
      { texto: 'Alguém consegue assumir rápido', pontos: 0 },
      { texto: 'Vai gerar impacto, mas resolvem', pontos: 1 },
      { texto: 'Afeta diretamente decisões e resultado', pontos: 2 }
    ]
  }
];

let perguntaAtual = 0;
let respostas = new Array(perguntas.length).fill(null);
let dadosUsuario = {};

// ---- Navegação entre telas ----

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(function (tela) {
    tela.classList.remove('ativa');
  });
  var alvo = document.getElementById(id);
  // Pequeno delay para acionar a transição CSS
  setTimeout(function () {
    alvo.classList.add('ativa');
    window.scrollTo(0, 0);
  }, 50);
}

// ---- Tela 1 → Tela 2 ----

function iniciarQuiz() {
  mostrarTela('tela-quiz');
  renderizarPergunta();
}

// ---- Quiz ----

function renderizarPergunta() {
  var p = perguntas[perguntaAtual];
  var container = document.getElementById('quiz-pergunta-container');

  var html = '<div class="pergunta-numero">Pergunta ' + (perguntaAtual + 1) + '</div>';
  html += '<div class="pergunta-texto">' + p.texto + '</div>';
  html += '<ul class="alternativas">';

  p.alternativas.forEach(function (alt, i) {
    var selecionada = respostas[perguntaAtual] === i ? ' selecionada' : '';
    html += '<li class="alternativa' + selecionada + '" onclick="selecionarAlternativa(' + i + ')">';
    html += '<input type="radio" name="q' + perguntaAtual + '" value="' + i + '"' + (respostas[perguntaAtual] === i ? ' checked' : '') + '>';
    html += alt.texto;
    html += '</li>';
  });

  html += '</ul>';
  container.innerHTML = html;

  // Atualizar progresso
  var preenchimento = document.getElementById('progresso-preenchimento');
  preenchimento.style.width = ((perguntaAtual + 1) / perguntas.length * 100) + '%';
  document.getElementById('progresso-texto').textContent = (perguntaAtual + 1) + ' de ' + perguntas.length;

  // Botões
  document.getElementById('btn-anterior').style.display = perguntaAtual === 0 ? 'none' : 'inline-block';

  var btnProximo = document.getElementById('btn-proximo');
  btnProximo.disabled = respostas[perguntaAtual] === null;

  if (perguntaAtual === perguntas.length - 1) {
    btnProximo.textContent = 'Ver resultado';
  } else {
    btnProximo.textContent = 'Próxima';
  }
}

function selecionarAlternativa(indice) {
  respostas[perguntaAtual] = indice;
  renderizarPergunta();
}

function proximaPergunta() {
  if (respostas[perguntaAtual] === null) return;

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    renderizarPergunta();
  } else {
    mostrarTela('tela-captura');
    configurarAutorizacao();
  }
}

function perguntaAnterior() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    renderizarPergunta();
  }
}

// ---- Tela 3 — Captura ----

function configurarAutorizacao() {
  var radios = document.querySelectorAll('input[name="autorizacao"]');
  var formulario = document.getElementById('formulario-captura');
  var btnDireto = document.getElementById('btn-ver-direto');

  radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (this.value === 'sim') {
        formulario.classList.add('visivel');
        btnDireto.style.display = 'none';
      } else {
        formulario.classList.remove('visivel');
        btnDireto.style.display = 'block';
      }
    });
  });
}

function verResultadoDireto() {
  var pontuacao = calcularPontuacao();
  var classificacao = classificar(pontuacao);
  dadosUsuario = {
    pontuacao: pontuacao,
    classificacao: classificacao,
    respostas: obterRespostasTexto(),
    autorizacao: 'nao'
  };
  mostrarResultado(pontuacao, classificacao, 'nao');
}

function calcularPontuacao() {
  var total = 0;
  respostas.forEach(function (resposta, i) {
    if (resposta !== null) {
      total += perguntas[i].alternativas[resposta].pontos;
    }
  });
  return total;
}

function classificar(pontuacao) {
  if (pontuacao <= 7) return 'RH Operacional';
  if (pontuacao <= 14) return 'RH em Transição';
  return 'RH Estratégico (ou quase)';
}

function obterRespostasTexto() {
  return respostas.map(function (r, i) {
    if (r !== null) return perguntas[i].alternativas[r].texto;
    return '';
  });
}

function enviarDados(event) {
  event.preventDefault();

  var form = document.getElementById('form-captura');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  var pontuacao = calcularPontuacao();
  var classificacao = classificar(pontuacao);

  var linkedinVal = document.getElementById('linkedin').value.trim();
  if (linkedinVal && !validarLinkedin(linkedinVal)) {
    alert('LinkedIn inválido. Use o formato: https://linkedin.com/in/seu-perfil');
    return;
  }

  dadosUsuario = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim(),
    cargo: document.getElementById('cargo').value.trim(),
    linkedin: linkedinVal,
    pontuacao: pontuacao,
    classificacao: classificacao,
    respostas: obterRespostasTexto(),
    autorizacao: 'sim'
  };

  // Mostrar resultado imediatamente, independente do envio
  mostrarResultado(pontuacao, classificacao, 'sim');

  // Enviar dados em background (nunca bloqueia)
  enviarParaAPI(dadosUsuario);
}

function mostrarResultado(pontuacao, classificacao, autorizacao) {
  mostrarTela('tela-resultado');

  document.getElementById('resultado-nivel').textContent = classificacao;
  document.getElementById('resultado-pontuacao').textContent = pontuacao + ' de 20 pontos';

  var conteudo = document.getElementById('resultado-conteudo');
  var html = '';

  if (pontuacao <= 7) {
    html += '<h2>Hoje você ainda é um RH operacional</h2>';
    html += '<p>Você resolve coisa.<br>Apaga incêndio.<br>Organiza processo.<br>Segura demanda que ninguém quer pegar.</p>';
    html += '<p>Mas ainda não senta na mesa pra decidir de verdade.</p>';
    html += '<p>E vamos falar a real?</p>';
    html += '<p>Isso não quer dizer que você é ruim.<br>Quer dizer que, hoje, a empresa te enxerga mais como execução do que como alguém que mexe no resultado.</p>';
    html += '<p style="margin-top:1.5rem;font-weight:500;">O que isso significa na prática:</p>';
    html += '<ul class="resultado-pratica">';
    html += '<li>você trabalha muito</li>';
    html += '<li>resolve muita coisa</li>';
    html += '<li>mas continua sendo deixada(o) de lado nas decisões</li>';
    html += '<li>e, se sair, alguém "dá um jeito"</li>';
    html += '</ul>';
    html += '<div class="resultado-insight">';
    html += '<p>Você não está presa(o) porque falta competência.</p>';
    html += '<p>Você está presa(o) porque ainda não aprendeu a transformar RH em argumento de negócio.</p>';
    html += '</div>';
    html += '<div class="resultado-chamada">';
    html += '<p>Se quiser, pode me autorizar a analisar seu resultado.</p>';
    html += '<p>Eu te mostro onde você ainda está operando como apoio e o que precisa ajustar pra parar de ser só "a menina do RH que resolve tudo".</p>';
    html += '</div>';
  } else if (pontuacao <= 14) {
    html += '<h2>Você já saiu de parte do operacional. Mas ainda não virou estratégica(o) de verdade.</h2>';
    html += '<p>Você já entendeu que RH não pode viver só de processo, ação interna e conversa bonita.</p>';
    html += '<p>Só que ainda tem uma trava:<br>em alguns momentos você pensa como estratégica(o),<br>mas na hora de se posicionar, defender uma ideia ou sustentar uma decisão, volta pro lugar de apoio.</p>';
    html += '<p>E esse é o pior limbo do RH.</p>';
    html += '<p>Porque você já não se vê como operacional.<br>Mas a empresa ainda não te vê como peça importante do negócio.</p>';
    html += '<p style="margin-top:1.5rem;font-weight:500;">O que isso significa na prática:</p>';
    html += '<ul class="resultado-pratica">';
    html += '<li>você já percebe problema antes dos outros</li>';
    html += '<li>já entende que cultura, clima e performance afetam resultado</li>';
    html += '<li>mas ainda não consegue sustentar isso com força</li>';
    html += '<li>e por isso continua sendo meio ouvida(o), meio ignorada(o)</li>';
    html += '</ul>';
    html += '<div class="resultado-insight">';
    html += '<p>Você não precisa aprender mais RH.</p>';
    html += '<p>Precisa aprender a sustentar seu RH com lógica de negócio, dado e posicionamento.</p>';
    html += '</div>';
    html += '<div class="resultado-chamada">';
    html += '<p>Se quiser, eu posso olhar seu resultado e te mostrar exatamente o que está faltando pra você parar de oscilar entre "boa(bom) de operação" e "estratégica(o) de verdade".</p>';
    html += '</div>';
  } else {
    html += '<h2>Você já pensa como RH estratégico. Mas isso ainda pode não estar te pagando de volta.</h2>';
    html += '<p>Você já entendeu o jogo.</p>';
    html += '<p>Já sabe que cultura sem resultado é custo.<br>Que clima sem impacto é só termômetro.<br>Que RH sem número vira área que perde verba primeiro.</p>';
    html += '<p>O problema é que mesmo tendo essa visão, muita gente ainda trava em uma coisa:<br>posicionamento.</p>';
    html += '<p>Porque não basta pensar certo.<br>Tem que conseguir sustentar isso na frente de gestor, dono e operação sem afinar.</p>';
    html += '<p style="margin-top:1.5rem;font-weight:500;">O que isso significa na prática:</p>';
    html += '<ul class="resultado-pratica">';
    html += '<li>você já não é RH de festinha</li>';
    html += '<li>já não compra discurso fofo</li>';
    html += '<li>já entende que pessoas precisam gerar resultado</li>';
    html += '<li>mas talvez ainda não esteja ocupando o espaço que deveria</li>';
    html += '</ul>';
    html += '<div class="resultado-insight">';
    html += '<p>Tem muito RH bom ficando pequeno porque sabe fazer, mas ainda não sabe se vender, se posicionar e se colocar como parte do lucro.</p>';
    html += '</div>';
    html += '<div class="resultado-chamada">';
    html += '<p>Se quiser, pode me autorizar a analisar seu resultado.</p>';
    html += '<p>Se eu enxergar ponto cego, eu te falo. E te mostro onde ajustar pra você não continuar crescendo sozinha(o) e no improviso.</p>';
    html += '</div>';
  }

  conteudo.innerHTML = html;

  if (autorizacao === 'sim') {
    // Já autorizou contato: esconde CTA e texto alternativo, mostra confirmação
    document.getElementById('btn-cta-final').style.display = 'none';
    document.getElementById('texto-alternativo').style.display = 'none';
    document.getElementById('form-cta-container').innerHTML = '';
    var msg = document.getElementById('mensagem-final');
    msg.style.display = 'block';
    msg.innerHTML = '<p>Seu resultado foi enviado para análise. Se fizer sentido, entrarei em contato com você.</p>';
  } else {
    // Escolheu refletir sozinha(o): mostra CTA e texto alternativo
    document.getElementById('btn-cta-final').style.display = 'block';
    document.getElementById('texto-alternativo').style.display = 'block';
    document.getElementById('form-cta-container').innerHTML = '';
    document.getElementById('mensagem-final').style.display = 'none';
  }
}

function enviarParaAPI(dados) {
  fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  }).catch(function () {
    // Silencioso — o resultado já foi exibido
  });
}

function validarLinkedin(url) {
  return /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-%.]+\/?$/.test(url);
}

function solicitarAnalise() {
  var btn = document.getElementById('btn-cta-final');
  var container = document.getElementById('form-cta-container');

  // Se o formulário já está visível, não renderiza de novo
  if (container.querySelector('form')) return;

  btn.style.display = 'none';

  var html = '<form id="form-cta" class="form-cta">';
  html += '<div class="campo"><label for="cta-nome">Nome *</label>';
  html += '<input type="text" id="cta-nome" required></div>';
  html += '<div class="campo"><label for="cta-email">E-mail *</label>';
  html += '<input type="email" id="cta-email" required></div>';
  html += '<div class="campo"><label for="cta-whatsapp">WhatsApp *</label>';
  html += '<input type="tel" id="cta-whatsapp" required placeholder="(00) 00000-0000"></div>';
  html += '<div class="campo"><label for="cta-linkedin">LinkedIn *</label>';
  html += '<input type="url" id="cta-linkedin" required placeholder="https://linkedin.com/in/seu-perfil"></div>';
  html += '<button type="submit" class="btn-principal">Enviar para análise</button>';
  html += '</form>';

  container.innerHTML = html;

  // Máscara WhatsApp no campo dinâmico
  aplicarMascaraWhatsapp(document.getElementById('cta-whatsapp'));

  document.getElementById('form-cta').addEventListener('submit', function (e) {
    e.preventDefault();

    var nome = document.getElementById('cta-nome').value.trim();
    var email = document.getElementById('cta-email').value.trim();
    var whatsapp = document.getElementById('cta-whatsapp').value.trim();
    var linkedin = document.getElementById('cta-linkedin').value.trim();

    if (!nome || !email || !whatsapp || !linkedin) {
      this.reportValidity();
      return;
    }

    if (!validarLinkedin(linkedin)) {
      alert('LinkedIn inválido. Use o formato: https://linkedin.com/in/seu-perfil');
      return;
    }

    var btnSubmit = this.querySelector('button[type="submit"]');
    btnSubmit.classList.add('btn-loading');
    btnSubmit.textContent = 'Enviando...';

    dadosUsuario.nome = nome;
    dadosUsuario.email = email;
    dadosUsuario.whatsapp = whatsapp;
    dadosUsuario.linkedin = linkedin;
    dadosUsuario.autorizacao = 'sim';

    // Mostrar confirmação independente do resultado do fetch
    container.innerHTML = '<div class="mensagem-final" style="display:block;"><p>Seu resultado foi enviado para análise. Se fizer sentido, entrarei em contato com você.</p></div>';
    document.getElementById('texto-alternativo').style.display = 'none';

    enviarParaAPI(dadosUsuario);
  });
}

// ---- Máscara WhatsApp ----

function aplicarMascaraWhatsapp(el) {
  if (!el) return;
  el.addEventListener('input', function (e) {
    var valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    if (valor.length > 6) {
      e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7);
    } else if (valor.length > 2) {
      e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    } else if (valor.length > 0) {
      e.target.value = '(' + valor;
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  aplicarMascaraWhatsapp(document.getElementById('whatsapp'));
});
