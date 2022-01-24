/* Desktop web Weather Application*/

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true})); // app.use() for taking location through html file



app.get("/",function(req,res)

{
    res.sendFile(__dirname+"/index.html"); // sending index.html to client to get user input
    
});

app.post("/",function(req,res)
{
    const query = req.body.CityName;  // we get name theat we passed in html form. For input has name "CityName"
    const apikey = "";  // enter your api generated from openweather.com
    const units = "metric";
    // below url split parts are above this line,
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apikey+"&units="+units; //this is the API url from postman, originally generated from OpenWeather.com 

    https.get(url,function(response) // we are making https get request over the internet to the URL to fetch some data from that server. We'll get a response back from OpenWeather server
    {
        console.log(response.statusCode);  // prints 200 on compiler, means success.It's like error 404 etc
    
        response.on("data",function(data)  // on() will give us the actual message body that the server has given us.
        {
            const weatherdata = JSON.parse(data); // converting the data to a Js object. 
            const temp = weatherdata.main.temp;   // Copy url in browser and then click on temp or description &/or whatever and click on copy path, then paste it here after "weatherdata.". temp conains location temperure
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon; 

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; // we got the link from openweather.com and removed "10d" and put +icon+ there
            
            res.write("<p>The weather is currently: " +description+ "</p>");   // displays description as para on client server (browser)./* there can only be one res.send() thats why we're using res.write() */
            res.write("<h1>The temperature in " + query+ " is: " +temp+ " degrees Celcius</h1>"); 
            res.write("<img src = "+ imageURL+">"); // displays image on client server (browser)
            res.send();
        });
    });
});


app.listen(3000,function()
{
    console.log("Server is running on port 3000.");
});
