import User from '../models/userModel.js';

export const getUserForSidebar = async(req,res)=> {
    try{
        const loggedInUserId = req.user._id;

        const filteredIsers = await User.find({_id:{ $ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredIsers);
        
    }catch(error){
        console.error("Error in getUserForSidebar: ",error.messages);
        res.status(500).json({error : "Internal server error"});
    }
}