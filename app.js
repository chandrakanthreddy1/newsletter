const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res) {
    const fn = req.body.firstname;    
    const ln = req.body.lastname;
    const email = req.body.inputEmail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fn,
                    LNAME: ln
                }

            }
         ]
    } 
   
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/91ad68abff";
    const options = {
        method: "POST",
        auth: "Chandu1:a60aea2b7398241cb1937f3020ee4c44-us17"

    } 
    const request = https.request(url,options,function(response) {

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function (data) {
            console.log(JSON.parse(data));
             
            
        })
      
    })

    request.write(jsonData);
    request.end();


})


app.post("/failure",function(req,res) {
    res.redirect("/")
    
})

app.listen(5000,function() {
  console.log("server is running");
})










//APIKEY
//a60aea2b7398241cb1937f3020ee4c44-us17

// LISTID
// 91ad68abff