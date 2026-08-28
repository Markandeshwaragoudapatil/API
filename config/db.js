const mongoose=require("mongoose");
const Product=require("../models/productModel")
const uri="mongodb://127.0.0.1:27017/store";



const connectDB=async ()=>{
    await client.connect();
    db=client.db("store")
    console.log("MongoDB connected");
};

const getDB=()=>{
    return db;
};

module.exports={
    connectDB,
    getDB
};