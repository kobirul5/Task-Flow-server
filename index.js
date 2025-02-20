require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors())

app.get("/", (req, res)=>{
    res.send("server is running")
})





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dgvjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("TaskDB").collection("Users")
    const taskCollection = client.db("TaskDB").collection("Tasks")


    app.post('/task-user', async (req, res)=>{
      const task = req.body;
      const result = await userCollection.insertOne(task)
      res.send(result)
    })
    app.post('/task-post', async (req, res)=>{
      const task = req.body;
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=>{
    console.log(`server is runnig on port : ${port}`)
})