const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/', (req, res) => {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res)=>{
    // console.log(req.body.fname);
  //  console.log(req.body.lname);
  //  console.log(req.body.mail);

    // putting recieved data into varaible;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.mail;

    // 
    var data ={
        members : [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]

    }
    // 
    var json_data = JSON.stringify(data);
    //

    const url = "https://us13.api.mailchimp.com/3.0/lists/6302e7d1c2";
    const options = {
        method: "POST",
        auth: "abdul:32e131366d49e28ee467e033f3ca3b58-us13"
    }
    const request = https.request(url,options,(response)=>{
        response.on("data",(data)=>{
            //console.log(JSON.parse(data));
            console.log(response.statusCode);
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })

    })


    request.write(json_data);
    request.end();


})
// redirect to home page
app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(port || 3000 ,()=>{
    console.log("Server is running on Port 3000");
})

//    32e131366d49e28ee467e033f3ca3b58-us13

//     6302e7d1c2

// https://polar-reef-58507.herokuapp.com/