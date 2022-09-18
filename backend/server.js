import cors from "cors"
import express from "express";
import myMenu from "./menu.js"
import morgan from "morgan";
const app = express();

const port = process.env.PORT || 5000;

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(morgan("dev"))

app.get("/api/feed",(req,res)=>{
    res.send(myMenu.feed)
})
app.get("/api/feed/:id", (req,res)=>{
    const food = myMenu.feed.find((x)=>x._id ==req.params.id)
    if(food){
        res.send(food)
    }else{
        res.status(400).send({message:"Food not found"})
    }
})
app.get("/", (req,res)=>{
    res.send("server is ready");
})

app.listen(port,()=>{
    console.log(`server is listen on port at http://localhost: ${port}`)
})