// acessing/importing the express module
const express = require('express');

// create our instance of an express app
const app = express();

// create some fake data as a JavaScript object - later this will be changed into data stored in a database
let songs = {'Ms Lauryn Hill': ['Superstar', 'Lost Ones', 'Doo Wop'], 'Trettman': 'New York', 'Jimi Hendrix': 'Purple Haze', 'RIZ LA VIE': ['Napkins', 'She Said']};

// tell the app where it should run and what to do when it starts running
app.listen(3000, ()=>{
    console.log('Hello alumni! This express app is listening on port 3000...');
});

// set up a route where the app can receive an http request (this is the "homepage" so to speak)
app.get('/music', (req, res)=>{
    console.log('Received a request at "localhost:3000/"')
    res.statusCode = 200;
    // pretending to retrieve some data aka songs from a source like a database
    // in this case it is just a global variable
    return res.json(songs);
});

// this middleware could be to test capitalization of our name
app.use('/artist/:name', (req, res, next)=>{
    console.log(`Request received to retrieve artist songs: ${req.params.name.toUpperCase()}`);
    if (req.params.name in songs){ 
        next();
    } else if (req.params.name.toUpperCase() in songs){
        req.newname = req.params.name.toUpperCase(); // not liking this line
        next();
    } else {
        res.statusCode = 404;
        return res.json({'No Songs by Artist': req.params.name});
    }
});

// a second get route - this time to only retrieve songs by a specific artist
app.get('/artist/:name', (req, res)=>{
    console.log('Made it to the GET route', req.params.name);
    res.statusCode = 200;
    if (req.newname){
        return res.json({'Artist': req.newname, 'Tracks': songs[req.newname]});
    }
    return res.json({'Artist': req.params.name, 'Tracks': songs[req.params.name]});
});

// this middleware helps the route receive and read JSON information
app.use('/admin', express.json());

// create a POST route to add a new artist to my "database"
app.post('/admin', (req, res)=>{
    console.log('Received POST request!');
    // unlike Flask, where we can just access JSON information from the body of a request in a route
    // we need to set up some translation of the request before we actually access the body of the request
    // middleware express.json() on like 49
    console.log(req.body);
    // once we've received and can read the information, we can use it to add to or change our existing "database"
    songs[req.body.artist] = req.body.songs;
    console.log(songs);
    res.statusCode = 204;
    return res.json({test: 'information'}); // bugged JSON response on the POST request - python JSON decoder error
});
// create an PUT route to change an existing artist's songs
app.put('/admin', (req, res)=>{
    // takes in an existing artist's name and changes their songs
    songs[req.body.artist] = req.body.songs;
    res.statusCode;
    return res.json('updated');
});
// create a DELETE route to remove an existing artist
app.delete('/admin', (req, res)=>{
    delete songs[req.body.artist];
    res.statusCode;
    return res.json('deleted');
});