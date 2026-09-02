const {addSession}=require("../services/loginService");
const { deleteSession } = require("../services/logoutService");
const { checkUser } = require("../services/profileService");

const loginUser=async (req,res)=>{
    const {username,password}=req.body;
    const session={
        username:username,
        password:password
    }
    const user=await checkUser(session);
    if(user){
        const oldSessionId=req.cookies.sessionId
        const session=await addSession(user);
        if(oldSessionId) await deleteSession(oldSessionId)
        res.cookie("sessionId",session.key.toString(),{
            httpOnly:true,
            secure:true
        }); 
        return res.status(200).json({
            message:"User logged in succesfully"
        }); 
    }
    else{
        return res.status(402).json({
            message:"Please register before login"
        })
    } 
    

};

module.exports={loginUser}