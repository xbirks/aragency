import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido.`);
  }

  const {
    name, email, phone, company, instagram,
    contentVolume, salesImpact, goals, budget,
    platforms, upcomingLaunch,
  } = req.body;

  if (!name || !email || !phone || !salesImpact || !budget) {
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

  const row = (label, value) =>
    value
      ? `<tr><td style="padding:10px 16px;font-weight:600;color:#161616;border-bottom:1px solid #eee;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:10px 16px;color:#333;border-bottom:1px solid #eee;vertical-align:top">${value}</td></tr>`
      : "";

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "info@ariannyrivasagency.com",
    subject: `Nueva solicitud — ${name}${company ? ` (${company})` : ""}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff">
        <div style="background:#161616;padding:28px 24px">
          <h1 style="margin:0;font-size:18px;font-weight:400;color:#fff;letter-spacing:1px">AR AGENCY</h1>
        </div>

        <div style="padding:28px 24px 12px">
          <h2 style="margin:0 0 4px;font-size:20px;font-weight:600;color:#161616">Nueva solicitud de contacto</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#888">Landing /sistema</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${row("Nombre", name)}
            ${row("Teléfono", phone)}
            ${row("Email", `<a href="mailto:${email}" style="color:#161616">${email}</a>`)}
            ${row("Empresa", company)}
            ${row("Instagram", instagram)}
            ${row("Contenido/semana", contentVolume)}
            ${row("Impacto en ventas", salesImpact)}
            ${row("Objetivo", goals)}
            ${row("Presupuesto mensual", budget)}
            ${row("Plataformas", platforms && platforms.length ? platforms.join(", ") : "")}
            ${row("Lanzamiento próximo", upcomingLaunch)}
          </table>
        </div>

        <div style="padding:20px 24px;border-top:1px solid #eee;font-size:11px;color:#aaa">
          Enviado desde ariannyrivasagency.com/sistema
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
