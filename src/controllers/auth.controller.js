import { updateByIdServices } from "../services/users.service.js";
import { readByServices } from "../services/users.service.js";
import { isValidPassword, createHash } from "../helpers/hash.helper.js";
 import crypto from "crypto"
import { sendResetPasswordEmail } from "../helpers/email.helper.js";

class AuthController{
    registerCb = async (req, res) => {
        const { _id } = req.user;
        /* return res
            .status(201)
            .json({ message: "Registered", response: _id, method, url }); */
        res.json201(_id, "Registered");
    };
    loginCb = async (req, res) => {
        const { _id } = req.user;
        const opts = {
            httpOnly: false,     // Permite que el navegador acceda a la cookie
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax"
        };
        console.log("Login callback", req.user);
        res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
    };
    signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "Sign out");
    onlineCb = (req, res) => res.json200(req.user, "Is online");
    badAuth = (req, res) => res.json401();
    forbidden = (req, res) => res.json403();
    verifyUserCb = async(req, res)=> {
        const { email, verifyCode } = req.params
        console.log(email, verifyCode)
        const user = await readByServices({ email, verifyCode })
        if (!user) {
            res.json404()
        }
        let data={ isVerified: true }
        await updateByIdServices(user._id, data)
        console.log("id a actualizar "+user._id)

        res.json200(user, "Verified!")
    }
    sendResetPasswordEmailCb = async (req, res) => {
        const { email } = req.body;
        const user = await readByServices({ email });


        if (!user) return res.json404("Usuario no encontrado.");

        const verifyCode = crypto.randomBytes(12).toString("hex");
        const codeCreatedAt = Date.now();

        await updateByIdServices(user._id, { verifyCode, codeCreatedAt });
        // let data = {email, verifyCode}
        // await updateByIdServices(id, data); 
        // await resetPassword(email, verifyCode); 

        //retomar
        await sendResetPasswordEmail(user.email, verifyCode);



        res.json200(null, "Correo de recuperación enviado.");
    };
    resetPasswordCb = async (req, res) => {
        try {
            const { email, newPassword } = req.body;

            // 1. Buscar el usuario por email
            const user = await readByServices({ email });

            if (!user) return res.json404("Usuario no encontrado");

            // // 2. Verificar que el código de verificación no haya expirado
            // const expirationLimit = 1000 * 60 * 60; // 1 hora
            // const now = Date.now();

            // if (!user.codeCreatedAt || now - new Date(user.codeCreatedAt).getTime() > expirationLimit) {
            // return res.json400("El enlace de recuperación ha expirado.");
            // }

            // 3. Verificar que la nueva contraseña no sea igual a la anterior
            // const mismaClave = isValidPassword(newPassword, user.password);
            // console.log(newPassword, user.password)
            // if (mismaClave) {
            //     return res.json400("La nueva contraseña no puede ser igual a la anterior.");
            // }

            // 4. Actualizar la contraseña
            const hashedPassword = createHash(newPassword);

            await updateByIdServices(user._id, {
            password: hashedPassword,
            verifyCode: null,
            codeCreatedAt: null,
            });

            return res.json200(null, "Contraseña actualizada con éxito");
        } catch (error) {
            console.error("Error en resetPasswordCb:", error);
            return res.json500("Error interno del servidor");
        }
    };
}
const authController = new AuthController()

export default authController