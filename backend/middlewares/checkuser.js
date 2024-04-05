import Users from "../models/userSchema.js";
async function isDoctor(req,res,next){
    const role=req.headers.role;
    if(role=="admin"){
        next();
    }
    else{
        res.json({sucess:false,message:"not an admin"})
    }
}
export default isDoctor;