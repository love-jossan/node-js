const dbconnect=require('./mongodb')

// const insert = async()=>{
//    const data= await dbconnect()
//     const result= await data.insertMany([
//         {me:'ram',class:'ba',age:'23'},
//         {me:'sam',class:'ba',age:'23'},
//         {me:'ok',class:'ba',age:'23'}]
//     )
//     console.log(result)
// }

// insert()

const deleterecord =async()=>{
    const data= await dbconnect()
     const result= await data.deleteOne(
         {me:'ok',}
     )
     console.log(result)
 }
 
 deleterecord()


