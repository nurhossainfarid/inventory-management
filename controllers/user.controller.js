const { signupService, findUserByEmail } = require("../services/user.service");
// const { sendEmailWithMailGun } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async function (req, res, next) {
    try {
        const user = await signupService(req.body);

        // const mailData = {
        //     from: "Mailgun Sandbox <nur-35-843@diu.edu.bd>",
        //     to: [user.email],
        //     subject: "Verify your account",
        //     text: "Thank you"
        // };

        // sendEmailWithMailGun(mailData)


        res.status(200).json({
            status: "success",
            message: "user create successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "user could not create successfully",
            error: error.message
        })
    }
}
/**
1. Check email and password are given
2. Load user with email
3. If not user send res 
4. If user compare password
5. If password doest not match send res
6. Check user is active 
7. If not active send res
8. Generate Token
9. send user and token
*/

exports.login = async function (req, res, next) {
    try {
        
        const { email, password } = req.body;
        if (!email||!password) {
            return res.status(401).json({
                status: "Failed",
                error: "Please provide your credentials"
            })
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                error: "No user found. Please create an account or try again later."
            })
        };
        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Failed",
                error: "Invalid password. Please try again with correct password."
            })
        };

        if (user.status != "active") {
            return res.status(401).json({
                status: "Failed",
                error: "Your account is not active yet"
            })
        };

        const token = generateToken(user);
        const {password: pwd, ...others} = user.toObject()

        res.status(200).json({
            status: "success",
            message: "Successfully login",
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "user could not login successfully",
            error: error.message
        })
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.user?.email);
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "user could not login successfully",
            error: error.message
        })
    }
}