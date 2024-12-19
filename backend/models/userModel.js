const mongoose = require("mongoose");
// mongodb+srv://rishirajtiwari200002:1KOZs66F6i1hTQ1z@cluster0.tnc28.mongodb.net//codeIDE
 mongoose.connect('mongodb://127.0.0.1:27017/codeIDE');

// mongoose.connect('mongodb+srv://rishirajtiwari200002:1KOZs66F6i1hTQ1z@cluster0.tnc28.mongodb.net/codeIDE');

let userSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,

    date:{
     type: Date,
     default: Date.now   
    },
    isBlocked: {
        type : Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('User',userSchema);