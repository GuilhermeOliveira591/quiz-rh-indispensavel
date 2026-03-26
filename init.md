# Quiz Diagnóstico de RH — Fanelli Consultoria
> Guia de contexto para o Claude Code. Leia este arquivo antes de qualquer alteração no projeto.

---

## 🎯 Objetivo do Projeto

Criar um **quiz diagnóstico profissional** para profissionais de RH, hospedado na Vercel.
O quiz coleta dados do usuário, calcula uma pontuação e envia os resultados por e-mail via SMTP do Gmail usando Nodemailer.

**Empresa:** Fanelli Consultoria
**Produto final:** Geração de leads qualificados para a mentoria **"Operação Peça-Chave"**
**Público-alvo:** Profissionais de RH — principalmente mulheres que já trabalham muito, vivem apagando incêndio, sabem executar, mas ainda não são vistas como estratégicas
**Tom:** Sério, direto, desconfortável, real. Sem linguagem coach, guru, LinkedIn fofo, "transformação" ou "desperte seu potencial".

---

## ⚠️ TOM E LINGUAGEM — REGRA INVIOLÁVEL

O texto **não pode** conter:
- Frases motivacionais
- Linguagem de coach ou curso online
- "Transformação", "jornada", "potencial", "despertar"
- Marketing genérico ou fofo

O texto **deve** soar como:
> Alguém que já trabalhou em RH de verdade. Que já teve verba cortada. Que já foi ignorada em reunião. Que já segurou BO de gestor. Que já percebeu que, sem falar de resultado, RH vira apoio e não decisão.

---

## 📁 Estrutura de Pastas

```
/
├── index.html         # Toda a estrutura HTML (4 telas)
├── styles.css         # Estilo visual completo
├── script.js          # Lógica do quiz, navegação e fetch
├── /api
│   └── send.js        # Função serverless — envio de e-mail via Nodemailer
├── package.json       # Dependência: nodemailer
└── CLAUDE.md          # Este arquivo
```

---

## 🖥️ Fluxo de Telas

```
[Tela 1 — Intro] → [Tela 2 — Quiz] → [Tela 3 — Captura] → [Tela 4 — Resultado]
```

---

## TELA 1 — INTRO

**Título:**
> Você influencia o negócio ou só organiza o caos?

**Subtítulo:**
> Responda com honestidade.
> Não é sobre o que você sabe.
> É sobre como você atua hoje no RH.

**Texto de apoio:**
> Se você está cansada de fazer muito, resolver muita coisa e ainda assim continuar fora das decisões, esse diagnóstico é pra você.

**Botão:** `Começar diagnóstico`

**Meta informações:** ⏱ 3 minutos · 10 perguntas · Resultado imediato

---

## TELA 2 — QUIZ

**Instrução exibida no topo do quiz:**
> Responda com base no que você faz hoje.
> Não no que você gostaria de fazer.
> Não no que você sabe na teoria.

### Perguntas e Pontuação

Cada alternativa tem um peso. A pontuação máxima é **20 pontos**.

---

**Pergunta 1**
Quando um gestor traz um problema de equipe, você:
- A) Escuta, orienta e sugere caminhos → **0 pontos**
- B) Analisa comportamento, contexto e liderança → **1 ponto**
- C) Traduz o problema em impacto na entrega e define ação com base nisso → **2 pontos**

---

**Pergunta 2**
Hoje, você consegue provar o impacto do RH em números?
- A) Não → **0 pontos**
- B) Parcialmente, em alguns casos → **1 ponto**
- C) Sim, consigo conectar com resultado e desempenho → **2 pontos**

---

**Pergunta 3**
Em decisões importantes, sua presença acontece porque:
- A) Você executa o que foi decidido → **0 pontos**
- B) Você contribui quando chamam → **1 ponto**
- C) Você influencia o que será decidido → **2 pontos**

---

**Pergunta 4**
Quando você propõe uma ação de RH, você pensa primeiro:
- A) No que vai melhorar o ambiente → **0 pontos**
- B) No que faz sentido para as pessoas → **1 ponto**
- C) No impacto que isso vai gerar no resultado da empresa → **2 pontos**

---

**Pergunta 5**
Quando algo não funciona no time, você:
- A) Tenta resolver com conversa e alinhamento → **0 pontos**
- B) Ajusta processos e acompanha → **1 ponto**
- C) Identifica causa, impacto no resultado e corrige com critério → **2 pontos**

---

**Pergunta 6**
Hoje, você consegue sustentar uma decisão com o dono ou liderança sem recuar?
- A) Evito conflito → **0 pontos**
- B) Tento argumentar, mas nem sempre sustento → **1 ponto**
- C) Sustento com base em impacto no negócio → **2 pontos**

---

**Pergunta 7**
Seu trabalho hoje é mais reconhecido por:
- A) Organização e execução → **0 pontos**
- B) Apoio ao time e ambiente → **1 ponto**
- C) Impacto real na performance da empresa → **2 pontos**

---

**Pergunta 8**
Sobre cultura e clima, você hoje:
- A) Cuida e acompanha → **0 pontos**
- B) Tenta melhorar com ações → **1 ponto**
- C) Conecta diretamente com produtividade e resultado → **2 pontos**

---

**Pergunta 9**
Quando você fala de RH, sua linguagem é mais:
- A) Pessoas, ambiente e bem-estar → **0 pontos**
- B) Organização e desenvolvimento → **1 ponto**
- C) Resultado, performance e impacto → **2 pontos**

---

**Pergunta 10**
Hoje, se você sair da empresa:
- A) Alguém consegue assumir rápido → **0 pontos**
- B) Vai gerar impacto, mas resolvem → **1 ponto**
- C) Afeta diretamente decisões e resultado → **2 pontos**

---

## TELA 3 — CAPTURA DE DADOS

**Título:** Seu resultado está pronto

**Texto:**
> Antes de liberar sua análise, escolha como quer seguir.

**Campos:**
- Nome *(obrigatório)*
- E-mail *(obrigatório)*
- WhatsApp *(obrigatório)*
- Cargo atual *(opcional)*
- Empresa *(opcional)*

**Opções de autorização (radio — escolha uma):**
- `( )` Quero ver meu resultado agora e refletir sozinha
- `( )` Quero ver meu resultado e autorizo que meu caso seja analisado

**Checkbox de autorização (exibido ao selecionar a segunda opção):**
> Autorizo que minhas respostas sejam analisadas e que entrem em contato comigo sobre meu diagnóstico e possíveis próximos passos.

**Botão:** `Ver meu resultado`

---

## TELA 4 — RESULTADO

### Tabela de classificação

| Pontuação | Nível                     |
|-----------|---------------------------|
| 0 – 7     | RH Operacional            |
| 8 – 14    | RH em Transição           |
| 15 – 20   | RH Estratégico (ou quase) |

---

### RESULTADO: 0 a 7 pontos — RH Operacional

**Título:**
> Hoje você ainda é um RH operacional

**Texto principal:**
> Você resolve coisa.
> Apaga incêndio.
> Organiza processo.
> Segura demanda que ninguém quer pegar.
>
> Mas ainda não senta na mesa pra decidir de verdade.
>
> E vamos falar a real?
>
> Isso não quer dizer que você é ruim.
> Quer dizer que, hoje, a empresa te enxerga mais como execução do que como alguém que mexe no resultado.

**O que isso significa na prática:**
- você trabalha muito
- resolve muita coisa
- mas continua sendo deixada de lado nas decisões
- e, se sair, alguém "dá um jeito"

**Insight:**
> Você não está presa porque falta competência.
> Você está presa porque ainda não aprendeu a transformar RH em argumento de negócio.

**Chamada:**
> Se quiser, pode me autorizar a analisar seu resultado.
> Eu te mostro onde você ainda está operando como apoio e o que precisa ajustar pra parar de ser só "a menina do RH que resolve tudo".

---

### RESULTADO: 8 a 14 pontos — RH em Transição

**Título:**
> Você já saiu de parte do operacional. Mas ainda não virou estratégica de verdade.

**Texto principal:**
> Você já entendeu que RH não pode viver só de processo, ação interna e conversa bonita.
>
> Só que ainda tem uma trava:
> em alguns momentos você pensa como estratégica,
> mas na hora de se posicionar, defender uma ideia ou sustentar uma decisão, volta pro lugar de apoio.
>
> E esse é o pior limbo do RH.
>
> Porque você já não se vê como operacional.
> Mas a empresa ainda não te vê como peça importante do negócio.

**O que isso significa na prática:**
- você já percebe problema antes dos outros
- já entende que cultura, clima e performance afetam resultado
- mas ainda não consegue sustentar isso com força
- e por isso continua sendo meio ouvida, meio ignorada

**Insight:**
> Você não precisa aprender mais RH.
> Precisa aprender a sustentar seu RH com lógica de negócio, dado e posicionamento.

**Chamada:**
> Se quiser, eu posso olhar seu resultado e te mostrar exatamente o que está faltando pra você parar de oscilar entre "boa de operação" e "estratégica de verdade".

---

### RESULTADO: 15 a 20 pontos — RH Estratégico (ou quase)

**Título:**
> Você já pensa como RH estratégico. Mas isso ainda pode não estar te pagando de volta.

**Texto principal:**
> Você já entendeu o jogo.
>
> Já sabe que cultura sem resultado é custo.
> Que clima sem impacto é só termômetro.
> Que RH sem número vira área que perde verba primeiro.
>
> O problema é que mesmo tendo essa visão, muita gente ainda trava em uma coisa:
> posicionamento.
>
> Porque não basta pensar certo.
> Tem que conseguir sustentar isso na frente de gestor, dono e operação sem afinar.

**O que isso significa na prática:**
- você já não é RH de festinha
- já não compra discurso fofo
- já entende que pessoas precisam gerar resultado
- mas talvez ainda não esteja ocupando o espaço que deveria

**Insight:**
> Tem muito RH bom ficando pequeno porque sabe fazer, mas ainda não sabe se vender, se posicionar e se colocar como parte do lucro.

**Chamada:**
> Se quiser, pode me autorizar a analisar seu resultado.
> Se eu enxergar ponto cego, eu te falo. E te mostro onde ajustar pra você não continuar crescendo sozinha e no improviso.

---

### BLOCO FIXO — Exibido em todos os resultados

**Título:** A real?

**Texto:**
> RH que não consegue conectar gente com resultado vira apoio.
>
> Apoio ajuda.
> Mas não decide.
>
> E se você quer parar de ser a pessoa que só executa, organiza e segura a bronca, vai ter que ajustar a forma como você pensa, fala e se posiciona.
>
> Não é sobre virar "RH do dono".
> Nem virar "amiga do time".
>
> É sobre parar de ser ignorada.

**CTA principal:** `Quero que você analise meu resultado`

**Texto alternativo abaixo do botão:**
> Se não quiser, tudo bem.
> Mas agora você já sabe uma coisa que talvez estivesse tentando evitar:
>
> não basta fazer RH bem feito.
> Tem que fazer RH que pesa no negócio.

---

### Mensagem após envio

**Se autorizou contato:**
> Seu resultado foi enviado para análise. Se fizer sentido, entrarei em contato com você.

**Se não autorizou:**
> Você pode ficar com esse diagnóstico. Mas agora já sabe o que precisa ajustar.

---

## 📧 Função Serverless — `/api/send.js`

### Payload esperado (JSON)
```json
{
  "nome": "string",
  "email": "string",
  "whatsapp": "string",
  "cargo": "string",
  "empresa": "string",
  "pontuacao": 14,
  "classificacao": "RH em Transição",
  "respostas": ["Texto da opção escolhida Q1", "..."],
  "autorizacao": "sim | nao"
}
```

### Configuração do Nodemailer (SMTP Gmail)
```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
```

### Variáveis de ambiente necessárias

| Variável               | Descrição                                      |
|------------------------|------------------------------------------------|
| `GMAIL_USER`           | E-mail Gmail que vai enviar                    |
| `GMAIL_APP_PASSWORD`   | Senha de app gerada no Google                  |
| `DESTINATARIO_EMAIL`   | E-mail da Fanelli Consultoria que recebe       |

---

## 🎨 Identidade Visual

| Elemento      | Valor                       |
|---------------|-----------------------------|
| Cor principal | `#A38E64` (dourado)         |
| Fundo         | `#F7F4EE` (off-white/creme) |
| Texto escuro  | `#1A1915`                   |
| Fonte display | Cormorant Garamond (serif)  |
| Fonte corpo   | DM Sans (sans-serif)        |
| Tom visual    | Elegante, premium, sóbrio   |

**Regras visuais:**
- Sem gradientes coloridos
- Sem ícones ilustrativos genéricos
- Sem aparência de quiz infantil ou Google Forms
- Transições suaves entre telas (`opacity` + `translateY`)
- Responsivo para desktop e mobile

---

## ⚙️ package.json

```json
{
  "name": "fanelli-quiz-rh",
  "version": "1.0.0",
  "dependencies": {
    "nodemailer": "^6.9.0"
  }
}
```

---

## 🚀 Como rodar localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar arquivo `.env` na raiz
```env
GMAIL_USER=seu-email@gmail.com
GMAIL_APP_PASSWORD=sua-senha-de-app
DESTINATARIO_EMAIL=contato@fanelliconsultoria.com.br
```

### 3. Rodar com Vercel CLI
```bash
npx vercel dev
```
> Acesse em: `http://localhost:3000`

---

## ☁️ Como fazer deploy na Vercel

```bash
npx vercel
```
Ou conecte o repositório GitHub diretamente no painel da Vercel.

**Settings → Environment Variables** — adicionar:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `DESTINATARIO_EMAIL`

### Gerar senha de app no Gmail
1. [myaccount.google.com](https://myaccount.google.com)
2. Segurança → Verificação em duas etapas → ative se necessário
3. Segurança → Senhas de app
4. Gerar para "Outro aplicativo"
5. Copiar e colar em `GMAIL_APP_PASSWORD`

---

## ✅ Checklist antes do deploy

- [ ] Perguntas e textos de resultado conferidos e aprovados
- [ ] E-mail destinatário definido (`DESTINATARIO_EMAIL`)
- [ ] Senha de app do Gmail gerada e configurada
- [ ] Testado localmente com `vercel dev`
- [ ] Envio de e-mail testado e confirmado
- [ ] Layout revisado em mobile e desktop

---

## 🚫 O que NÃO fazer

- Não usar frameworks (React, Vue, etc.)
- Não usar bibliotecas pesadas além do Nodemailer
- Não usar PHP
- Não usar Resend ou SendGrid
- Não suavizar o texto das perguntas e resultados
- Não adaptar a linguagem para tom de coach ou curso online
- Não usar OAuth2 do Gmail — usar apenas App Password
- Não usar linguagem genérica de marketing
- Não deixar com aparência de quiz bobo ou infantil

---

*Fanelli Consultoria — Diagnóstico de RH Estratégico | Operação Peça-Chave*