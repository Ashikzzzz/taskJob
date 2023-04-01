const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const jwt = require("jsonwebtoken")
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());


// database 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0zgm21v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
try {
    const bookedCollection = client
    .db("taskJob")
    .collection("bookedCourse");
    const categoryCollection = client
    .db("taskJob")
    .collection("categoryName");

    app.post('/bookings',async(req, res)=>{
        try {
            const body = req.body
            // console.log(body)
            const result = await bookedCollection.insertOne(body)
            // console.log(result)
            if(result.insertedId){
                res.status(200).json({success:true, data:result})
            }
        } 
        catch (error) {
            res.status(401).json({success:false, message:"something went wrong"})
        }
    })



    // for all data 
    app.get("/gettingData",async(req, res)=>{
       try{
        const query={};
        const result = await bookedCollection.find(query).toArray()
        res.status(200).json({success:true, data:result})
       }
        catch (error) {
            res.status(401).json({success:false, message:"something went wrong"})
        }
    })

    // category name 
app.get("/categoryName",async(req, res)=>{
    try {
     const query={}
     const result = await categoryCollection.find(query).toArray()
     res.status(200).json({success:true, data:result})
    } 
    catch (error) {
     res.status(401).json({success:false, message:"something went wrong"})
    }
 })

//  categroy wise api 
app.get("/categoryName/:categoryName",async(req, res)=>{
    try {
        const category= req.params.categoryName
        // console.log(category)
        const query ={category_name: category}
        // console.log(query)
        const result = await bookedCollection.find(query).toArray()
        console.log(result)
        res.status(200).json({success:true, data:result})
    } 
    catch (error) {
        res.status(401).json({success:false, message:"something went wrong"})
    }
})
  
} 

finally {
}


}


run().catch((err) => console.log(err));


app.get("/", (req, res) => {
    res.send("I am Running");
  });
  
  app.listen(port, () => {
    console.log(`Server running ${port}`);
  });