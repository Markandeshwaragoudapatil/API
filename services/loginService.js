const Session=require("../models/Session");
const getSession=async(sessionId)=>{
    return await Session.findById(sessionId)
}
const addSession=async (user)=>{
    return await Session.create({
        userId:user._id,
        key:user.password,
        expiresAt:new Date(Date.now()+5*60*1000)
    })
}
module.exports={
    getSession,
    addSession
}