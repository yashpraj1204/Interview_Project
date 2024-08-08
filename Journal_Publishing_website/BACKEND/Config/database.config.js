const mongoose = require('mongoose')

async function  main(){
        mongoose.connect('mongodb+srv://yashprajapati121204:nsW9Fbi9E7TBCeVH@cluster0.x7fyrbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') ; 
}
module.exports = main ;