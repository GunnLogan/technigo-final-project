import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid/v4"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/signup-form-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  // bcrypt.compareSync("supersecretpassword", hash) // true
  // bcrypt.compareSync("incorrectpassword", hash) // false

  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

// Add more endpoints here!
app.post("/users", (req, res) => {
  // const { username } = req.body
  // const password = bcrypt.hashSync(req.body.password)
  // const { email } = req.body
  // const user = new User({ username, email, password })
  //
  // user.save()
  //   .then(() => { res.status(201).send("user created") })
  //   .catch(err => { res.status(400).send(err) })

  User.findOne({ name: req.body.name, password })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ accessToken: user.accessToken })
      } else {
        res.json({ notFound: true })
      }
    })
    .catch(err => {
      res.json(err)
    })
})

app.listen(8080, () => console.log("Products API listening on port 8080!"))
