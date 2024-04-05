import Users from '../models/userSchema.js'



async function pushUser(req,res){
    try{
        const userId = req.body.id;
        console.log(userId);
        const dbUser = await Users.findOne({id:userId});
        if(!dbUser){
            const user = await Users.create({id : userId});
            await user.save();
            return res.json({success : true, msg : "New User registered"});
        }
        else{
           return res.json({msg : "already registerd"})
        }
        
    }catch(e){
        console.log(e);
        res.json({success : false , msg : "Unable to parse the body parameters."});
    }
}

export {pushUser};