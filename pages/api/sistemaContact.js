import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido.`);
  }

  const {
    name, email, phone, company, instagram,
    brandPhase, contentVolume, topResults,
    platforms, budget, urgency,
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Faltan campos obligatorios." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const section = (title, rows) => {
    const filtered = rows.filter(([, v]) => v);
    if (!filtered.length) return "";
    return `
      <div style="margin-bottom:28px">
        <h3 style="margin:0 0 12px;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #161616;padding-bottom:8px">${title}</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${filtered.map(([label, value]) =>
            `<tr>
              <td style="padding:8px 0;color:#888;font-size:12px;width:140px;vertical-align:top">${label}</td>
              <td style="padding:8px 0;color:#161616;font-weight:500;vertical-align:top">${value}</td>
            </tr>`
          ).join("")}
        </table>
      </div>
    `;
  };

  const pill = (text) => `<span style="display:inline-block;background:#f2f2f2;color:#161616;font-size:13px;padding:4px 12px;margin:2px 4px 2px 0;border-radius:3px">${text}</span>`;

  const urgencyColor = urgency && urgency.includes("4–8 semanas") ? "#831a36" : urgency && urgency.includes("1–2 meses") ? "#b8860b" : "#555";

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "info@ariannyrivasagency.com",
    subject: company ? `Nueva solicitud — ${company}` : `Nueva solicitud — ${name}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff">

        <div style="background:#161616;padding:32px 28px 28px">
          <h1 style="margin:0 0 6px;font-size:20px;font-weight:400;color:#fff;letter-spacing:1px">AR AGENCY</h1>
          <p style="margin:0;font-size:12px;color:#888">Nueva solicitud desde /sistema</p>
        </div>

        <div style="padding:32px 28px 8px">

          ${section("Contacto", [
            ["Nombre", name],
            ["Teléfono", phone],
            ["Email", email ? `<a href="mailto:${email}" style="color:#161616;text-decoration:underline">${email}</a>` : ""],
            ["Empresa", company],
            ["Instagram", instagram],
          ])}

          ${section("Sobre la marca", [
            ["Fase actual", brandPhase],
            ["Contenido/semana", contentVolume],
            ["Objetivo principal", topResults && topResults.length ? topResults.map(r => pill(r)).join("") : ""],
          ])}

          ${section("Inversión y canales", [
            ["Plataformas", platforms && platforms.length ? platforms.map(p => pill(p)).join("") : ""],
            ["Presupuesto mensual", budget ? `<strong>${budget}</strong>` : ""],
          ])}

          ${urgency ? `
          <div style="margin-bottom:28px">
            <h3 style="margin:0 0 12px;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #161616;padding-bottom:8px">Urgencia</h3>
            <p style="margin:0;font-size:14px;font-weight:600;color:${urgencyColor}">${urgency}</p>
          </div>
          ` : ""}

        </div>

        <div style="padding:16px 28px;background:#f9f9f9;border-top:1px solid #eee;font-size:11px;color:#aaa">
          ariannyrivasagency.com/sistema
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Solicitud enviada correctamente." });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ message: "Error interno al enviar el correo." });
  }
}
