import requests as r

#data = r.post('http://localhost:3000/new/artist', json={'artist':'Jay-Z', 'songs': ['Heart of the City', 'Renegade']})
data = r.get('http://localhost:3000/music')
print(data.status_code)
print(data)
print(data.json()) # error on POST route

# Express GET Route vs. Flask GET Route

# app.get('/music', (req, res)=>{
#     console.log('Received a request at "localhost:3000/"')
#     res.statusCode = 200;
#     // pretending to retrieve some data aka songs from a source like a database
#     // in this case it is just a global variable
#     return res.json(songs);
# });
