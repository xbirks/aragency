import sharp from "sharp";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido.`);
  }

  const {
    gender,
    firstName,
    lastName,
    email,
    phone,
    instagram,
    country,
    city,
    height,
    images,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const attachments = await Promise.all(
    images.map(async (img, idx) => {
      const matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches) return null;
      let buffer = Buffer.from(matches[2], "base64");
      buffer = await sharp(buffer)
        .resize(900)
        .jpeg({ quality: 40 })
        .toBuffer();

      return {
        filename: `foto_${idx + 1}.jpeg`,
        content: buffer,
        encoding: "base64",
      };
    })
  ).then((arr) => arr.filter(Boolean));

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "hola@soyandres.es",
    subject: `Nueva candidatura de modelo: ${firstName} ${lastName}`,
    html: `
      <h2>Datos de la candidatura</h2>
      <ul>
        <li><strong>Género:</strong> ${gender}</li>
        <li><strong>Nombre:</strong> ${firstName} ${lastName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
        <li><strong>Instagram:</strong> ${instagram}</li>
        <li><strong>País / Ciudad:</strong> ${country} / ${city}</li>
        <li><strong>Altura:</strong> ${height} cm</li>
      </ul>
    `,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Candidatura enviada correctamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ message: "Error interno al enviar el correo" });
  }
}
