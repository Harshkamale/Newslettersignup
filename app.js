const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){

  var firstname = req.body.fname;
  var lastname =req.body.lname;
  var email = req.body.email;

var data = {
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname,

      }
    }
  ]
};
var jsonData = JSON.stringify(data);
const url ="https://us5.api.mailchimp.com/3.0/lists/9b4e0c2c2e";
const options = {
  method: "POST",
  auth: "harsh:7ccf0fe362e03cd4d982122d8ce288cd-us5"
}
const request = https.request(url, options, function(response){
  if (response.statusCode === 200) {
res.sendFile(__dirname + "/success.html");
  }else{
res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running");
});





//API KEY
//7ccf0fe362e03cd4d982122d8ce288cd-us5
//// ID
//9b4e0c2c2e
