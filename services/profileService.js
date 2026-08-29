const Session=require("../models/loginModel");

const getProfile = async (sessionId) => {
    return await Session.findById(sessionId);
};

module.exports = { getProfile };