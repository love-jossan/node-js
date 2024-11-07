const express=require('express')
require('./mongoose')
const Product= require('./product')
const cors = require('cors');
const app=express()
const multer = require('multer');
const path = require('path');
app.use(express.json())
app.use(cors());
app.post("/create", async(req,resp)=>{
    let data=new Product(req.body);
    let result= await data.save()
    resp.send(result)
})
app.get("/list",async(req,resp)=>{
    let data= await Product.find()
    resp.send(data)
})
app.delete("/delete/:_id",async(req,resp)=>{
    let data=await Product.deleteOne(req.params)
    resp.send(data)
})
app.put("/update/:_id",async(req,resp)=>{
    let data=await Product.updateOne(
        req.params,
        {$set:req.body}

    )
    resp.send(data)
})
app.get("/search/:key",async(req,resp)=>{
   let data= await Product.find();
   resp.send(data.filter(e=>e.Name.toLowerCase().includes(req.params.key.toLowerCase())))
})
app.get("/list/:id",async(req,resp)=>{
    let data= await Product.find();
    let id=req.params.id;
    resp.send(data.find(e=>e.id==id))
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set destination directory for uploaded files
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Set the filename to be original name of the file
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  // Initialize Multer with the storage engine
  const upload = multer({ storage: storage });
  
  // Middleware to serve static files from the 'uploads' directory
  app.use(express.static('uploads'));
  
  // Define route to handle single file upload
  app.post('/upload', upload.single('file'), (req, res) => {
    // 'file' is the field name in the form
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send({
      message: 'File uploaded successfully.',
      file: req.file,
    });
  });
  app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    res.send({
      message: 'Files uploaded successfully!',
      files: req.files,
    });
  });
  

app.listen(5000)