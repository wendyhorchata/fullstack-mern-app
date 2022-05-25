//Dependencies 
require("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

//Database Connection 
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection 
 .on("open", ()=> console.log("MongoDB Connected"))
 .on("close", () => console.log("Connection Closed"))
 .on("error", (error) => console.log(error))

// Model
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

// Middleware 
app.use(cors())
app.use(morgan("dev"))
app.use(express.json()) // parse

// Routes
app.get("/", (req, res) => {
  res.send("Hello World")
})

// IDUCS

//Index
app.get("/people", async (req, res) => {
    try {
    res.json(await People.find({}))
    } catch (error) {
     res.status(400).json(error)
    }
})

// Delete
app.delete("/people/:id", async (req, res) => {
    try {
     res.json( await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Update
app.put("/people/:id", async (req, res) => {
    try {
      res.json(await People.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
     res.status(400).json(error)
    }
})

// Create
app.post("/people", async (req, res) => {
    try {
       res.json(await People.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
})

// Show
app.get("/people/:id", async (req, res) => {
    try {
        res.json(await People.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Listener 
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));