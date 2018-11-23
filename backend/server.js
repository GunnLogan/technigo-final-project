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
const mongoServer = process.env.MONGO_URL || "mongodb://localhost/myDb"
mongoose.connect(mongoServer, { useNewUrlParser: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.

const User = mongoose.model("User", {
  text: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  // key: {
  //   type: String,
  //   default: () => uuid()
  // }
})

// const firstUser = new User({ name: "Bob", password: bcrypt.hashSync("foobar") })
// firstUser.save().then(() => console.log("Created Bob"))
//
// const secondUser = new User({ name: "Sue", password: bcrypt.hashSync("password1") })
// secondUser.save().then(() => console.log("Created Sue"))

// Example root endpoint to get started with
// app.get("/users/:id", (req, res) => {
//   const password = "supersecretpassword"
//   const hash = bcrypt.hashSync(password)

bcrypt.compareSync("supersecretpassword", hash) // true
bcrypt.compareSync("incorrectpassword", hash) // false

//   res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
// })

// Add more endpoints here!

app.post("/login", (req, res) => {
  User.find({ name: "Bob" }).then(user => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ message: "Success!", token: user.accessToken, userId: user.id })
    } else {
      res.status(401).json({ message: "Authentication failure" })
    }
  })
})

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user.accessToken === req.headers.token) {
        req.user = user
        next()
      } else {
        res.status(401).send("Unauthorized")
      }
    })
}

app.use("/users/:id", findUser)

app.get("/users/:id", (req, res) => {
  res.json({ email: res.user.email })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
app.listen(8080, () => console.log("Products API listening on port 8080!"))
