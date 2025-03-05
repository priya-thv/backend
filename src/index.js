// const express=require("express")
// const app=express()

// const path=require("path")
// const hbs=require("hbs")
// const collection=require("./mongodb")
// app.use(express.json())

// const templates=path.join(__dirname,'../templates')
// app.set("view engine","hbs")
// app.set("views",templates)

// app.get('/',(req,res)=>{
//     res.render("login")
// })
// app.get('/signup',(req,res)=>{
//     res.render("signup")
// })

// app.post("/signup",async(req,res)=>{
 
//     const data={
//         name:req.body.name,
//         password:req.body.password
//     }

//     await collection.insertMany([data])
// })
// app.listen(8000,()=>{
//     console.log("port connected ");
// })

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const Collection = require("./mongodb"); // Import the model

const app = express();
app.use(express.static('public'));

// Set view engine to Handlebars
app.set('view engine', 'hbs');
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set View Engine
const viewsPath = path.join(__dirname, "../views");
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const data = new Collection({
            name: req.body.name,
            password: req.body.password
        });

        await data.save(); // Use save() instead of insertMany()
        res.send("Signup successful!");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error during signup.");
    }
    res.render("home")
});

app.post("/login", async (req, res) => {
    try {
        const check=await Collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
    } catch (error) {
        res.send("wrong details")
    }
    
});

// Start Server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
