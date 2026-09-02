const Session=require("../models/Session");
const deleteSession=async (sessionId)=>{
    return await Session.findByIdAndDelete(sessionId);
}
module.exports={deleteSession}