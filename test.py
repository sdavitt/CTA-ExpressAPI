import requests as r

data = r.get('http://localhost:3000/artist/riz la vie')
print(data.status_code)
print(data.json())


# app.get('/music', (req, res)=>{
#     console.log('Received a request at "localhost:3000/"')
#     res.statusCode = 200;
#     // pretending to retrieve some data aka songs from a source like a database
#     // in this case it is just a global variable
#     return res.json(songs);
# });
@app.route('/music', methods=["GET"])
def music():
    print()
    return jsonify({'something':'ok'}, 200)