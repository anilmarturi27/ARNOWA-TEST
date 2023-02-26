const express=require("express")
const mongoose=require("mongoose")
const Registeruser=require("./model")
const usertext=require('./model1')
const bodyparser=require('body-parser')
const cors = require('cors')

const app=express()
// to connect mongoose we use
mongoose.connect("mongodb+srv://aniani:aniani@cluster0.l9p8zqy.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>{
        console.log("db connected...")
    }
)

// for body parser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


// user to connect front end and backend
app.use(cors({origin :"*"}))


// making http post request
app.post('/login',async(req,res)=>{
    
    try{
        const{username,email,phno}=req.body


        let emai=await Registeruser.findOne({email})
        let phn=await Registeruser.findOne({phno})
        let usernam=await Registeruser.findOne({username})
        let date=new Date()
        if(emai || phn || usernam){
            Registeruser.findOneAndUpdate({ email:email }, { date: new Date() }, { new: true }, (err, user) => {
                if (err) throw err;
                if (user) {
                  console.log(user.date);
                  return res.send("use existed") // output: the updated date value of the document
                }
              });
            

        }
        
        else{
            let newuser= new Registeruser({
                username,email,phno,date
            })
            await newuser.save()
            return res.send("login succesful")

        }
    

    }
    catch(err){
        console.log(err)
    }
})

app.get("/home",async(req,res)=>{
    try{
        const {email}=req.body
        console.log(req)
        console.log(email)
        return res.send(email)
    }
    catch(err){
        console.log(err)
    }
})

// making http post request

app.post('/home',async(req,res)=>{
  try{
     const{text,timeDuration,email,id}=req.body
    
     if(id){
        usertext.find({ email:email }, (err, user) => {
            if (err) throw err;
            if (user) {
              return res.send(user); // output: the ID of the document
            }
          });
        // console.log(id)
     }
     else{

     
     const date=new Date()
     let data=new usertext({
        text,date,timeDuration,email
     })
     await data.save()
     return res.send("data saved ")
  }
}
  catch(err){
    console.log(err)
  }

})


// running port 
app.listen(process.env.PORT || 5000,()=>{
    console.log("server running...")
})