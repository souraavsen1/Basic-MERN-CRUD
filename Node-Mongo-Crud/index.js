const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


const nameref = useRef("")

// Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wfxhs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/* 
client.connect((err) => {
  const collection = client.db("Users").collection("Details");
  // perform actions on the collection object
  console.log("Hitting");
  const newUser = { name: "Sourav", email: "sourav@gmail.com" }
  collection.insertOne(newUser)
  
    .then(() => {
    console.log("inserted");
  })

  // client.close();
});
 */

async function run() {
  try {
    await client.connect();

    const database = client.db("Users");
    const userCollection = database.collection("Details");
    // create a document to insert

    //POST Data
    // const doc = {
    //   name: "Gourab",
    //   email: "gourab@gmail.com",
    // };
    // const result = await newUser.insertOne(doc);
    // console.log(`Inserted successfully with the _id: ${result.insertedId}`);
   
    // Get All Users
    app.get("/allusers", async (req, res) => {
      const users = await userCollection.find({}).toArray()
      res.send(users)
    });

    //POST Data
    app.post("/create", async (req, res) => {
      console.log("POST Doneee", req.body);
      console.log(req.body);
      const saveUser = await userCollection.insertOne(req.body)
      res.json(saveUser);
    });

    // DELETE a User
    app.delete("/remove-user/:id", async(req, res) => {
      const ID = req.params.id
      const user = { _id: ObjectId(ID) }
      const result = await userCollection.deleteOne(user);
      console.log("Delete User",result);
      res.json(result)
    })

    // DETAILS
    app.get("/user-details/:id", async (req, res) => {
      const ID = req.params.id;
      const user = { _id: ObjectId(ID) };
      const userDetails = await userCollection.findOne(user)
      res.send(userDetails)
    })

    // Update
    app.put("/user/update/:id", async (req, res) => {
      console.log(req.params.id);
      console.log(req.body);
      const filter = { _id: ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
          email: req.body.email
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      console.log(result);
      res.send(result)
    })


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
