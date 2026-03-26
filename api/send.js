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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const {
      nome,
      email,
      whatsapp,
      cargo,
      empresa,
      pontuacao,
      classificacao,
      respostas,
      autorizacao
    } = req.body;

    if (!nome || !email || !whatsapp) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const autorizou = autorizacao === 'sim';

    const respostasFormatadas = respostas
      .map(function (r, i) {
        return (i + 1) + '. ' + r;
      })
      .join('\n');

    const htmlEmail = `
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
          ${empresa ? `<tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 13px; color: #5C5847;">Empresa</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #D6CFC0; font-size: 14px; color: #1A1915;">${escapeHtml(empresa)}</td>
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

    const assunto = autorizou
      ? `[DIAGNÓSTICO] ${classificacao} — ${nome} (autorizou contato)`
      : `[DIAGNÓSTICO] ${classificacao} — ${nome}`;

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
