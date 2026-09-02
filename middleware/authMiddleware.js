const {getSession} = require("../services/loginService");
const authenticate=async (req,res,next)=>{
    const sessionId=req.cookies.sessionId;
    if(sessionId===undefined){
        return res.status(401).json(
            {message:"Session ID is required"}
        )
    }
    const session=await getSession(sessionId);
    if(!session){
        return res.status(401).json(
            {message:"Not authenticated, Please login"}
        )
    }
    req.session=session;
    next();    
};

module.exports={authenticate}
