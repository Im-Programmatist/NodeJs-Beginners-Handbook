import express from "express";
import mongoose from "mongoose";
const app = express();
const default_port = 3999;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const connectionString = "mongodb://127.0.0.1:27017/nodeJsHandbook";
//const dbCon = mongoose.createConnection("mongodb://localhost:27017/nodeJsHandbook");
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log(`Database connection established successfully!!!`);
})
.catch((e) => {
    console.error(`Database connection failed!!!`,e);
});
const schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    city:{
        type:String
    }
});
const UserSchema = mongoose.model("User",schema,"users");
app.get('/add_data', async(req, res)=>{
    const userData = {
        "name":"chetan",
        "age":29,
        "city":"Amravati"
    } 
    const userRecord = new UserSchema(userData);
    await userRecord.save()
    .then((doc)=>{
        res.json(doc);
    })
    .catch((e) => {
        console.error(`data insertion failed!!!`,e);
        res.end(`data insertion failed!!! - ${e}`);
    })
});

app.get('/fetch_data', (req, res)=>{
    const userRecord = UserSchema.find((err, doc)=>{
        if(err) throw err;
        res.json(doc);
    });
});

app.get('/update_data/:id?', async(req, res)=>{
    console.log(req.params.id, req.query.name,req.query.age);
    if(req.params.id){
        const userUpdate = await UserSchema.updateOne({_id:req.params.id},{$set:{name:req.query.name,age:req.query.age}},{new:true});
        console.log(userUpdate);
        res.json(userUpdate);
    }else{
        res.json({"message":"Id not pass with data to update record"})
    }
});

app.get('/delete_data/:id', async(req, res)=>{
    console.log(req.params.id);
    if(req.params.id){
        const deletedUser = await UserSchema.deleteOne({_id:req.params.id});
        console.log(deletedUser);
        res.json(deletedUser);
    }else{
        res.json({"message":"Id not pass with data to update record"})
    }
});

app.listen(default_port, "127.0.0.1", (err) => {
    if(err) throw err;
    console.log(`Server start at localhost:${default_port}`);
});
