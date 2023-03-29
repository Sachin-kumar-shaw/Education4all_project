const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { post } = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})
app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                        FNAME:firstName,
                        LNAME:secondName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/a9dc1dc26f";
    const options = { 
        method:"POST",
        auth:"sachin:94798f4e558ed6393f17876080c98ed3-us21",
    };

    const request = https.request(url,options,function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
//API key
//94798f4e558ed6393f17876080c98ed3-us21
//list ID
//a9dc1dc26f
app.listen( 3000,function(){
    console.log("Server is currently running on port-3000");
})