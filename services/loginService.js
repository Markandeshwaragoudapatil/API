const mongoose= require("mongoose");
const Session=require("../models/loginModel");

const addUser=async (user)=>{
    return await Session.create(user)
}
module.exports={addUser}