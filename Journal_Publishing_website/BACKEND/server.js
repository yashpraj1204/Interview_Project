const main = require("./Config/database.config")
const app = require("./index")
const port = 8080
main().then(()=>{
    console.log("Successfully connected to the database");
}).catch((err)=>{
    console.log("Error detected to connect db: ", err);    
})

app.listen(8080,()=>{
    console.log("Sever is listening to the request...");    
})