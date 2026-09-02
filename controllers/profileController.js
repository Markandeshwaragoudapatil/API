const {getProfile}=require("../services/profileService");
const getUserProfile=async (req,res)=>{
    const session=req.session;
    const user=await getProfile(session.userId);
    res.status(200).json({
        name:user.name
    })
}
module.exports={getUserProfile};