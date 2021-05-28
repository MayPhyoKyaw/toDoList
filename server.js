// include all required modules
var http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require("mongodb");

// server details
const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));
// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`))

// get item lists data from the database
app.get('/SelectItems', async (req, res) => {
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    // const client = new MongoClient(url);
    const dbName = "toDoList";
    // connect to your cluster
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const dbRes = client.db(dbName);
    console.log("Connected correctly to server for selecting....");
    dbRes.collection('listItems').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.post('/addToDoItem', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function CreateRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for creating....");
            const db = client.db(dbName);
            // Use the collection "people"
            const doc = db.collection("listItems");
            // Construct a document
            let newDocument = {
                _id: (new ObjectId).toString(),
                itemName: req.body.item_name,
                doneStatus: 0,
            };
            // Insert a single document, wait for promise so we can read it back
            const p = await doc.insertOne(newDocument);
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }
    CreateRun().catch(console.dir);
});

// update make status
app.post('/MakeStatus', (req, res) => {
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function EditRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for editting make status....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            console.log(req.body.itemID)
            // create a filter for a movie to update
            const filter = {
                _id: req.body.itemID,
            };
            // update a document
            const updateDoc = {
                $set: {doneStatus: 1},
            };
            // for update many
            const result = await collection.updateOne(filter, updateDoc);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
        } finally {
            await client.close();
        }
    }
    EditRun().catch(console.dir);
});