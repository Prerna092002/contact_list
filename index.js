//const { equal } = require('assert');
const express=require('express');
const path=require('path');
const port=3000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('./assets'));
// //middleware1
// app.use(function(req,res,next){
//     req.myName="Arpan";
//     console.log("Middleware1 called");
//     next();
// });
// //middleware2
// app.use(function(req,res,next){
//     console.log("My name from MW2 is",req.myName);
//     console.log("Middleware2 called");
//     next();
// });
var contactList=[
    {
        name:"Arpan",
        phone:'1111111111'
    },
    {
        name:"Tony Stark",
        phone:'2222222222'
    },
    {
        name:"Coding Ninjas",
        phone:'1234567890'
    }
]


app.get('/',function(req,res){
    //console.log(__dirname);
    //res.send('<h1>Cool its running! or is it?</h1>');
    console.log("from the get controller",req.myName);
   Contact.find({},function(err,contacts){
    if(err){
        console.log("Error in fetching contacts from db");
        return;
    }
    return res.render('home',{
        title:"My Contacts List",
        contact_list:contacts
   });
});
});
app.get('/practice',function(req,res){
    return res.render('practice',{title:"Lets Play with ejs!"});
});
app.get('/delete-contact',function(req,res){
    console.log(req.query);
   let id=req.query.id;
   Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log("Error in deleting contact from db");
        return;
    }
    return res.redirect('back');
   })
});
app.post('/create-contact',function(req,res){
//    contactList.push({
//     name:req.body.name,
//     phone:req.body.phone
//    });
// contactList.push(req.body);
Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
if(err){
    console.log("Error in creating a contact!");
    return;
}
console.log("********",newContact);
return res.redirect('back');
})
    
})
app.listen(port,function(err){
   if(err){
    console.log('Error in running the server',err);
   }
   console.log('Yup, My express app is running on Port ',port);
})