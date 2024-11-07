const {MongoClient}= require('mongodb');
const url='mongodb://localhost:27017'
const database='collge'
const client= new MongoClient(url);

async function dbconnect(){
    let result=  await client.connect();
    let db=result.db(database);
    return db.collection('students');
   
}
module.exports = dbconnect
