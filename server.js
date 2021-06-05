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
app.use('/images', express.static(__dirname + 'public/images'))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/details.html', (req, res) => {
    res.sendFile(__dirname + '/details.html')
})

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`))

app.get('/SelectProject', async (req, res) => {
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
    dbRes.collection('project').find().sort({$natural: -1}).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

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
    dbRes.collection('listItems').find().sort({$natural: -1}).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.post('/createProject', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function CreateProjRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for creating....");
            const db = client.db(dbName);
            // Use the collection "listItems"
            const doc = db.collection("project");
            // Construct a document
            let newDocument = {
                _id: (new ObjectId).toString(),
                projTitle: req.body.projTitle,
                description: req.body.projDesc,
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
    CreateProjRun().catch(console.dir);
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
            // Use the collection "listItems"
            const doc = db.collection("listItems");
            // Construct a document
            let newDocument = {
                _id: (new ObjectId).toString(),
                itemName: req.body.item_name,
                pid: req.body.proj_id,
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
app.post('/MakeDoneStatus', (req, res) => {
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function DoneRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for editting make status....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            console.log(req.body.itemID)
            // create a filter to update done status
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
    DoneRun().catch(console.dir);
});

app.post('/MakeUndoStatus', (req, res) => {
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function UndoRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for editting make status....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            console.log(req.body.item_id)
            // create a filter to update done status
            const filter = {
                _id: req.body.item_id,
            };
            // update a document
            const updateDoc = {
                $set: {doneStatus: 0},
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
    UndoRun().catch(console.dir);
});

// edit task
app.post('/editTask', (req, res) => {
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function EditRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for editting make status....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            console.log(req.body.itemId)
            // create a filter to update done status
            const filter = {
                _id: req.body.itemId,
            };
            // update a document
            const updateDoc = {
                $set: {itemName: req.body.item_name},
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

// Delete to do item list
app.post('/DeleteItem', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function DeleteRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for deleting....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            console.log(req.body.item_id)
            // create a filter to delete
            const filter = {
                _id: req.body.item_id,
            };
            // for delete one
            const result = await collection.deleteOne(filter);
            if (result.deletedCount === 1) {
                console.dir("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            await client.close();
        }
    }
    DeleteRun().catch(console.dir);
});

app.post('/DeleteAll', (req, res) => {
    // console.log(req.body)
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function DeleteAllRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for deleting....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            // console.log(req.body.item_id)
            // create a filter to delete
            // const filter = {
            //     _id: req.body.item_id,
            // };
            // for delete one
            const result = await collection.deleteMany();
            if (result.deletedCount === 1) {
                console.dir("Successfully deleted All documents.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            await client.close();
        }
    }
    DeleteAllRun().catch(console.dir);
});

app.post('/DeleteCompletedTasks', (req, res) => {
    // console.log(req.body)
    const url = 'mongodb+srv://ksp_ToDoList:ksp12345@cluster0.b0t7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "toDoList"

    async function DeleteCtasksRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for deleting....");
            const database = client.db(dbName);
            const collection = database.collection("listItems");
            // console.log(req.body.item_id)
            // create a filter to delete
            const filter = {
                doneStatus: 1,
            };
            // for delete one
            const result = await collection.deleteMany(filter);
            if (result.deletedCount === 1) {
                console.dir("Successfully deleted All documents.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            await client.close();
        }
    }
    DeleteCtasksRun().catch(console.dir);
});