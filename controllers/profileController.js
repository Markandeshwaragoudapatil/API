const {getProfile}=require("../services/profileService");

const getUserProfile=async (req,res)=>{
    const sessionId=req.cookies.sessionId;
    const user=await getProfile(sessionId);
    res.status(200).json({name:user.name});
}
module.exports={getUserProfile};