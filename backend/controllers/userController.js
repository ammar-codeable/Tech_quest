import Users from '../models/userSchema.js';

async function pushUser(req, res) {
    try {
        const userId = req.body.userId;
        
        
        if (!userId) {
            return res.json({ success: false, msg: "UserId is missing in the request body." });
        }

        const dbUser = await Users.findOne({ userId });
        
        
        if (dbUser) {    
            
           
            return res.json({ success: false, msg: "User already registered" });
        } else {
            const newUser = new Users({ userId });
            await newUser.save();
            return res.json({ success: true, msg: "New User registered" });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false , msg: "Internal server error." });
    }
}

export { pushUser };
