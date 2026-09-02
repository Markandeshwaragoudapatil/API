const {addSession}=require("../services/loginService");
const { deleteSession } = require("../services/logoutService");
const { checkUser,addUser } = require("../services/profileService");

const loginUser=async (req,res)=>{
    const {name,username,password}=req.body;
    const session={
        username:username,
        password:password
    }
    if(req.cookies.sessionId){
        await deleteSession(req.cookies.sessionId)
    }
    const user=await checkUser(session);
    if(user){
        const session=await addSession(user);
        res.cookie("sessionId",session._id.toString(),{
            httpOnly:true,
            secure:true
        }); 
        return res.status(200).json({
            message:"User logged in succesfully"
        }); 
    }
    else{
        const newUser=await addUser({name,username,password});
        const session=await addSession(newUser);
        res.cookie("sessionId",session._id.toString(),{
            httpOnly:true,
            secure:true
        });
        return res.status(201).json({
            message:"User created and logged in succesfully"
        }); 
    } 
    

};

module.exports={loginUser}