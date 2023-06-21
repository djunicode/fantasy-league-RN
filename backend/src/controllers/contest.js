const {Contest} = require("../models/contestSchema.js")

function createCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


const getContest = async(req , res)=>{
    try{
        const Allcontest =  await Contest.find();
    }
    catch(e){
        res.status(404).send({error : e.message , success : false});
        
    }
}

const createContest = async(req , res)=>{
    try {
        const contest  = new Contest(req.body);
        if(contest.typeOfContest == 'private'){
            contest.code = createCode()
        }
        await contest.save();
        res.status(200).send({message : "Contest Created Successfully"+ contest , success : true});

    } catch (e) {
        res.status(404).send({error : e.message , success :  false})
    }
}

const deleteContest = async(req , res) =>{
    try{
        const contest  = await Contest.findByIdAndDelete({_id : req.params})
        res.status(200).send({messsage : "Contest deleted" , success : true})
    }catch(e){
        res.status(400).send({message: e.msg , success : false})
    }
    
}

const updateContest = async(req, res)=>{
    try {
        const allowedUpdates = ["spots", "noOfTeams","winningPrice"]
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid Updates!" });
        }
        const contest = await Contest.findByIdAndUpdate(
            req.params,
            {
                $set: contest.req.body
            }
        )
        await contest.save()
        res.status(200).send({message: "Post Updated Successfully" , success : true})
    } catch (e) {
        res.status(400).send({message: e.msg , success : false})
    }
}

const addUser = async(req, res)=>{  //adds user to the contest
    try{
        const contest  = await Contest.findById(req.params)
        if(contest.typeOfContest == 'private' && contest.code == req.body.code){
            contest.users.push(req.Userdata._id)
            await contest.save()
            res.status(200).send({message: "You are added to contest" , success  : true})
        }
        else if(contest){
            contest.users.push(req.Userdata._id)
            await contest.save()
            res.status(200).send({message: "You are added to contest" , success  : true})
        }
        else{
            res.status(400).send({message: "no contest found" , success  : false})
        }
    }
    catch(e){
        res.status(400).send({message:e.msg , success: true})
    }
}

const removeUser = async(req, res)=>{  //removes to user from the contest
    try{
        const contest  = await Contest.findById(req.params)
        if(contest.users.includes(Userdata._id)){
            let i = contest.users.indexof(Userdata._id)
            contest.users.splice(i,1)
            await contest.save()
            res.status(200).send({msg: "you have been removed from contest" , success : true})
        }
    }catch(e){
        res.status(400).send({msg : e.msg , success : true})
    }
}


module.exports = {
    getContest,
    createContest,
    deleteContest,
    updateContest,
    addUser,
    removeUser
}
