const { default: mongoose } = require("mongoose");
 
async function connectDB(){
    const DATABASE_SERVER = process.env.DATABASE_SERVER
    mongoose.connect(DATABASE_SERVER).then(()=>{
        console.log("Database Connected Successfully")
    }).catch((err)=>{
        console.log(err || "Issues facing to connect database")
    })
}
module.exports = connectDB