const { default: mongoose } = require("mongoose");
const bcrypt  =  require('bcrypt');

// USERSSCHEMA
let userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword  = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword;
        next()
        
    } catch (error) {
        console.log(error)
    }
  });
//   USERSMODEL
const userModel = mongoose.model("userModels",userSchema);

// JOURNAL SCHEMA 

const journalSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        image:{
            type:String
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userModels'
        },
        notes:[{type:mongoose.Schema.Types.ObjectId,ref:"noteModel"}]
    }   
)

// JOURNAL MODEL
const journalModel = mongoose.model("journalModel",journalSchema)


// NOTES SCHEMA
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    create_at :{
        type:String,
        default:Date()
    },
    journal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"journalModel"
    }
})
// NOTES MODEL

const noteModel = mongoose.model("noteModel",noteSchema)
module.exports = {userModel,noteModel,journalModel}