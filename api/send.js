const nodemailer = require('nodemailer');

// ---- Rate limiting em memória (por IP) ----
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_MAX = 5; // máx 5 envios por IP a cada 15 min

function isRateLimited(ip) {
  var now = Date.now();
  var entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// ---- Validações ----
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var LINKEDIN_REGEX = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-%.]+\/?$/;
var MAX_FIELD_LENGTH = 200;
var MAX_RESPOSTA_LENGTH = 300;

function validarCampos(body) {
  var { nome, email, whatsapp, cargo, linkedin, pontuacao, classificacao, respostas, autorizacao } = body;

  if (!nome || !email || !whatsapp) {
    return 'Campos obrigatórios não preenchidos';
  }

  if (typeof nome !== 'string' || nome.length > MAX_FIELD_LENGTH) {
    return 'Nome inválido';
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > MAX_FIELD_LENGTH) {
    return 'E-mail inválido';
  }

  var whatsappDigits = whatsapp.replace(/\D/g, '');
  if (typeof whatsapp !== 'string' || whatsappDigits.length < 10 || whatsappDigits.length > 11) {
    return 'WhatsApp inválido';
  }

  if (cargo && (typeof cargo !== 'string' || cargo.length > MAX_FIELD_LENGTH)) {
    return 'Cargo inválido';
  }

  if (linkedin && (typeof linkedin !== 'string' || !LINKEDIN_REGEX.test(linkedin))) {
    return 'LinkedIn inválido';
  }

  if (typeof pontuacao !== 'number' || pontuacao < 0 || pontuacao > 20 || !Number.isInteger(pontuacao)) {
    return 'Pontuação inválida';
  }

  var classificacoesValidas = ['RH Operacional', 'RH em Transição', 'RH Estratégico (ou quase)'];
  if (!classificacoesValidas.includes(classificacao)) {
    return 'Classificação inválida';
  }

  if (!Array.isArray(respostas) || respostas.length !== 10) {
    return 'Respostas inválidas';
  }

  for (var i = 0; i < respostas.length; i++) {
    if (typeof respostas[i] !== 'string' || respostas[i].length > MAX_RESPOSTA_LENGTH) {
      return 'Resposta inválida';
    }
  }

  if (autorizacao !== 'sim' && autorizacao !== 'nao') {
    return 'Autorização inválida';
  }

  return null;
}

// ---- Sanitizar texto para assunto de e-mail (previne header injection) ----
function sanitizeSubject(text) {
  return String(text).replace(/[\r\n\t]/g, ' ').substring(0, 200);
}

// ---- Transporter ----
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ---- Handler ----
module.exports = async function handler(req, res) {
  // CORS — apenas origens permitidas
  var allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [];
  var origin = req.headers.origin || '';

  if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origem não permitida' });
  }

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Rate limiting
  var clientIp = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0].trim()
    : req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Muitas requisições. Tente novamente em alguns minutos.' });
  }

  // Limite de tamanho do body
  var bodyStr = JSON.stringify(req.body);
  if (!bodyStr || bodyStr.length > 10000) {
    return res.status(413).json({ error: 'Payload muito grande' });
  }

  try {
    var {
      nome,
      email,
      whatsapp,
      cargo,
      linkedin,
      pontuacao,
      classificacao,
      respostas,
      autorizacao
    } = req.body;

    // Validação completa
    var erro = validarCampos(req.body);
    if (erro) {
      return res.status(400).json({ error: erro });
    }

    var autorizou = autorizacao === 'sim';

    var respostasFormatadas = respostas
      .map(function (r, i) {
        return (i + 1) + '. ' + r;
      })
      .join('\n');

    var htmlEmail = `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F7F4EE; padding: 2rem;">
        <div style="font-size: 12px; color: #A38E64; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem;">
          Fanelli Consultoria | Stefanie Santana - RH que dá lucro — Diagnóstico
        </div>

        <h1 style="font-family: Georgia, serif; font-size: 24px; color: #1A1915; margin-bottom: 0.5rem;">
          Novo diagnóstico recebido
        </h1>

        <p style="font-size: 14px; color: #5C5847; margin-bottom: 2rem;">
          ${autorizou ? '&#9989; Autorizou análise e contato' : '&#10060; Não autorizou contato'}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847; width: 120px;">Nome</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915; font-weight: 500;">${escapeHtml(nome)}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847;">E-mail</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847;">WhatsApp</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915;">${escapeHtml(whatsapp)}</td>
          </tr>
          ${cargo ? `<tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847;">Cargo</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915;">${escapeHtml(cargo)}</td>
          </tr>` : ''}
          ${linkedin ? `<tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847;">LinkedIn</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915;"><a href="${escapeHtml(linkedin)}" style="color: #A38E64;">${escapeHtml(linkedin)}</a></td>
          </tr>` : ''}
        </table>

        <div style="background-color: #FFFFFF; padding: 1.5rem; margin-bottom: 2rem;">
          <div style="font-size: 13px; color: #A38E64; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Resultado</div>
          <div style="font-family: Georgia, serif; font-size: 28px; color: #1A1915; font-weight: 600;">${pontuacao} de 20 pontos</div>
          <div style="font-size: 16px; color: #5C5847; margin-top: 0.25rem;">${escapeHtml(classificacao)}</div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <div style="font-size: 13px; color: #A38E64; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">Respostas</div>
          <pre style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; color: #5C5847; line-height: 1.8; white-space: pre-wrap;">${escapeHtml(respostasFormatadas)}</pre>
        </div>

        <div style="font-size: 11px; color: #A38E64; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #D6CFC0;">
          Fanelli Consultoria | Stefanie Santana - RH que dá lucro — Operação Peça-Chave
        </div>
      </div>
    `;

    var assunto = sanitizeSubject(
      autorizou
        ? '[DIAGNÓSTICO] ' + classificacao + ' — ' + nome + ' (autorizou contato)'
        : '[DIAGNÓSTICO] ' + classificacao + ' — ' + nome
    );

    await transporter.sendMail({
      from: `"Fanelli Consultoria | Stefanie Santana" <${process.env.GMAIL_USER}>`,
      to: process.env.DESTINATARIO_EMAIL,
      subject: assunto,
      html: htmlEmail
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
};

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
