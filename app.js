var express = require("express");
const https = require('node:https');

let app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/" + "Signup.html")
});

app.post("/", (req, res) => {


    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [{ email_address: email, status: "subscribed", merge_fields: { FNAME: fName, LNAME: lName } }]
    }

    var jSonData = JSON.stringify(data);
    //const url = "https://gs-dc39.mailchimpsites.com.api.mailchimp.com/3.0/lists/e7a7310f54";
    const url = "https://us14.api.mailchimp.com/3.0/lists/e7a7310f54";
    const options = { method: "post", auth: "girishtumkur@gmail.com:725ae8786e912ae47e9a70fcc91bd063-us14" };
    const request = https.request(url, options, function (mailChimpResponse) {
        mailChimpResponse.on("data", (apiResponse) => {
            console.log("response from mail chimp ", JSON.parse(apiResponse));
            console.log("application status code" + apiResponse.statusCode);
            res.sendFile(__dirname + "/" + "success.html")
        })

    });
    request.on("error", (e) => {
        res.sendFile(__dirname + "/" + "failure.html")
        // res.end();
        console.log("error at line 37" + e);

    })

    request.write(jSonData);
    request.end();

})




app.listen(process.env.PORT || 3000, () => {
    console.log("running on port 3000");
})