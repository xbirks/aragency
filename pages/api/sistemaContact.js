import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido.`);
  }

  const { name, email, phone } = req.body;

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

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "andres03ortega@gmail.com",
    subject: `Nueva solicitud desde /sistema: ${name}`,
    html: `
      <h2>Nueva solicitud de contacto — Landing /sistema</h2>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
      </ul>
      <p>Enviado desde la landing /sistema de AR Agency.</p>
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
