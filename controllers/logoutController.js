const { deleteSession } = require("../services/logoutService");
const logoutUser = async (req, res) => {

    const sessionId = req.cookies.sessionId;

    await deleteSession(sessionId);

    res.clearCookie("sessionId");

    res.status(200).json({
        message: "Logged out successfully"
    });
};

module.exports = { logoutUser };