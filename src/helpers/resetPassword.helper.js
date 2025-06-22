import { transport } from "./email.helper.js";

const resetPassword = async (email, verifyCode) => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Reseteo de contraseña",
      html: `
        <p>Hacé clic en el enlace para restablecer tu contraseña. Este enlace expira en 1 hora.</p>
        <a href="http://localhost:8080/reset/${email}?code=${verifyCode}">RESET!</a>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export default resetPassword;
