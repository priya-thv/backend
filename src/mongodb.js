// const mongoose=require("mongoose")

// mongoose.connect("mongodb://localhost:27017/loginsignuptutorial")
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log("failed to connect")
// })

// const loginschema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const collection=new mongoose.model("collection1")

// module.exports=loginschema

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/loginsignuptutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(() => {
    console.log("Failed to connect to MongoDB");
});

// Define Schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Register Model
const Collection = mongoose.model("collection1", loginSchema);

// Export the Model instead of the Schema
module.exports = Collection;
