const express= require("express");
const path= require("path");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port=8000;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    Email: String,
    Address: String,
    Desc: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //FOR SERVING STATIC FILES
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// app.use(express.urlencoded);

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //SET THE TEMPLATE ENGINE AS PUG
app.set('views', path.join(__dirname,'views')); //SET THE VIEWS DIRECTRY  


//ENDPOINTS
app.get('/',(req, res)=>{
    const params={ }
    res.status(200).render('home.pug', params);
});

app.get('/contact',(req, res)=>{
    const params={ }
    res.status(200).render('contact.pug', params);
});

//TO POST REQUEST ON CONTACT
app.post('/contact',(req, res)=>{
    var myData=new Contact(req.body); 
    myData.save().then(()=>{
        res.send("This item has been saved to the DB");
    }).catch(()=>{
        res.status(400).send("Item was not send to the data base");
    });

    // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
});