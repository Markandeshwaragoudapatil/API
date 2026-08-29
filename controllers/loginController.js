const {addUser}=require("../services/loginService");

const loginUser=async (req,res)=>{
    const {username,password}=req.body;
    const session={
        name:username,
        key:password
    }
    const user=await addUser(session);
    res.cookie("sessionId",user._id.toString());
    res.json({message:"User added successfully",user});
};

module.exports={loginUser}