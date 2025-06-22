import { updateByIdServices } from "../services/users.service.js";
import { readByServices } from "../services/users.service.js";

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


}
const authController = new AuthController()

export default authController