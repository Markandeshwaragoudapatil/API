const { addSession } = require("../services/loginService");
const { addUser } = require("../services/profileService");

const registerUser = async (req, res) => {
    const { name, username, password } = req.body;
    const newUser = await addUser({ name, username, password });
    const session=await addSession(newUser)
    res.cookie("sessionId",session.key,{
        httpOnly:true,
        secure:true
    });
    return res.status(201).json({
        message: "User registered and logged in successfully",
        user: newUser.name
    });
};

module.exports = { registerUser };