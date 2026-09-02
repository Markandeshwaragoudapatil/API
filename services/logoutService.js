const Session=require("../models/Session");
const deleteSession=async (sessionId)=>{
    return await Session.deleteOne({key:sessionId});
}
module.exports={deleteSession}