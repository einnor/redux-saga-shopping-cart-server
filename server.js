const express = require('express');
const cors = require('cors');
const port = 8081;
const app = new express();
YAML = require('yamljs');

const serverDelayConstant = 100;
// Simulate a small amount of delay to demonstrate app's async features
app.use((req,res,next)=>{
    const delay = (Math.random() * 15 + 5) * serverDelayConstant;
    setTimeout(next,delay);
});

app.use(express.static('public'));

nativeObject = YAML.load('database.yml',(database)=>{
	
	

    app.listen(port,()=>{
        console.log(`Redux Saga Cart backend server is listening on ${port}`)
    });
});
app.use(cors());
