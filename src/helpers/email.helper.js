import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    }
})
const sendEmailHelper = async (email) => {
    try {
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Mail de prueba",
            html: "<h1>Correo de prueba con nodemailer</h1>"
        })
    } catch (error) {
        throw (error)
    }
}
const sendResetPasswordEmail = async (email, verifyCode) => {
  const resetLink = `http://localhost:8080/reset/${email}?code=${verifyCode}`;

  const mailOptions = {
    from: "Soporte <tuemail@tudominio.com>",
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h1>Recuperación de contraseña</h1>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  return await transport.sendMail(mailOptions);
};
export {transport,sendResetPasswordEmail}
export default sendEmailHelper