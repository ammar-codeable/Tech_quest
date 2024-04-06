import Users from '../models/userSchema.js';

async function pushUser(req, res) {
    try {
        const {id}= req.body;
        const name=req.body.fullName;

        if (!id) {
            return res.json({ success: false, msg: "UserId is missing in the request body." });
        }
        const dbUser = await Users.findOne({ userId: id });
        if (dbUser) {    
            return res.json({ success: false, msg: "User already registered" });
        } else {
            const newUser = await Users.create({ userId:id,name:name});
            return res.json({ success: true, msg: "New User registered" });
        }
    } catch (e) {
        console.log(e);
      
        res.json({ success: false , msg: "Internal server error." });
    }
}
async function getUsers(req,res){
    try{
        const data=await Users.find();
        if(!data){
            res.json({success:false,message:"no users found"});
        }
        else{
            res.json({success:true,data})
        }
       
    }
    catch(error){
        console.log(error);
    }
}
async function getReport(req,res){
    try{
        const user= await Users.findOne({userId:req.params.id})
        console.log(user);
        if(!user){
            res.json({success:false,message:"no user found"})
        }
        else{
            const report=user.report;
            if(!report){
            res.json({success:false,message:"no report of that user"})
            }
            else{
                res.json({success:true,report});
            }
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
    }

}

export { pushUser,getUsers,getReport };
