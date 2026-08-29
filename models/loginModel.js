const mongoose=require("mongoose");
const sessionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    key:{
        type:String,
        required:true,
    }
});
const Session=mongoose.model("Session",sessionSchema);
module.exports=Session