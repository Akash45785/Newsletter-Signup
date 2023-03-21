const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {

  const FirstName = req.body.Fname;
  const LastName = req.body.Lname;
  const Email = req.body.email;

  const data = {
    members: [{
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME: FirstName,
        LNAME: LastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/01f01df688"
  const options = {
    method: "POST",
    auth: "akash:eb3e66439c18cf2c943753797639a8e5-us10"
  };

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }



    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();


})


app.post("/failure" , function(req , res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on localhost 3000");
})







//    API KEY
//    eb3e66439c18cf2c943753797639a8e5-us10

// audience ID
// 01f01df688
