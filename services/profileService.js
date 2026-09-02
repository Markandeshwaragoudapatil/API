const Session=require("../models/Session");
const User = require("../models/User");

const getProfile = async (userId) => {
    return await User.findById(userId);
};
const addUser=async (user)=>{
    return await User.create(user)
}
const checkUser=async(user)=>{
    return await User.findOne({
        username:user.username,
        password:user.password
    });
}
module.exports = { 
    getProfile,
    addUser,
    checkUser
 };