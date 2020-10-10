
const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser');

// const fs = require("fs");


const app = express();
let port =process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());

app.use(express.static('views'))

app.get('/',(req,res)=>{
	res.sendFile('views/app.html', { root: __dirname })
})

app.post("/", function(req,res){
	
	console.log(req.body)
	res.sendFile('views/app.html', { root: __dirname })
	//res.send(req.body)
	// res.send("hi welcome");
});

app.listen(port,()=>{console.log(`running on ${port}`)});
