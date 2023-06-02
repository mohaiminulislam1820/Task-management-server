const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listening');
})

app.get('/', (req, res) => {
    res.send('Task Management server running....');
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@crud-practice.heeny6h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.get('/tasks', async (req, res) => {

    const collection = await client.db('Task-management').collection('task-crud');
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.post('/add-task', async (req, res) => {
    const task = req.body;
    const collection = await client.db('Task-management').collection('task-crud');

    const result = await collection.insertOne(task);
    res.send(result);
});

app.delete('/delete-task/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const collection = await client.db('Task-management').collection('task-crud');
    console.log(query)

    const result = await collection.deleteOne(query);

    res.send(result);
})

app.patch('/update-task-status/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: req.body };
  
    const collection = await client.db('Task-management').collection('task-crud');
  
    const result = await collection.updateOne(query, updateDoc);
  
    res.send(result);
  
  })