const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')


const app = express()
const port = 80

// create application/json parser
var jsonParser = bodyParser.json()

// print process.argv
const ipServer = process.argv[2]
app.use(cors())

let counter = 0;

app.get('/', (req, res) => {
    res.send(`<html>
                        <body>
                        <h1>Hello World!</h1>
                        <h3>This is our super counter!</h3>
                            <input type="number" id="val" value="0">
                            <button name="Add"  onclick="add();">Add</button>
                            <br>
                            <p style="display: inline-block">Valeur du compteur: </p>
                            <span id="display" style="display: inline-block"></span>
                            <button style="display: block" name="Actualiser"  onclick="update();">Actualiser la valeur du compteur</button>
                        </body>
                        <script>
                        function update() {
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open( "GET", "http://${ipServer}/counter"); // false for synchronous request
                            xmlHttp.send();
                            xmlHttp.onreadystatechange=(e)=> {
                                document.getElementById('display').innerText = xmlHttp.responseText;
                            }                          
                        }
                        function add() {
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", "http://${ipServer}/counter", true);
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            const value = document.getElementById('val').value;
                            xhr.send(JSON.stringify({
                                val: value
                            }));
                        }
                        </script>
                    </html>`
    )
})

app.post('/counter', jsonParser, (req, res) => {
    counter += parseInt(req.body.val);
    return 0
})

app.get('/counter', (req, res) => {
    res.send("" + counter)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
