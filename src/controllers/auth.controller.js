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
}
const authController = new AuthController()

export default authController