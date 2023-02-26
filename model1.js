const mongoose=require('mongoose')

let usertext= new mongoose.Schema({
   
    text:{
        type:String,
        
    },
    date :{
        type : Date,
        default : Date.now
    },
    timeDuration :{
        type : String
    },
    email :{
       type : String,
       required : true,
       unique : true

    }
  

    
})

module.exports = mongoose.model("usertext",usertext)