const mongoose=require('mongoose')
const productschema= new mongoose.Schema({
       Name:String,
       class:String,
       age:Number,
       district:String

})
 module.exports=mongoose.model('students',productschema)