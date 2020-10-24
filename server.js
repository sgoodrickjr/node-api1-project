// this import is now pulling from node_modules instead of the Node stdlib
const express = require("express")
const db = require("./database")

//create an express server instance
const server = express()


server.use(express.json())

server.get("/api", (req, res) => {
    res.json({message: "Hello, World"})
})


server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    //return this "fake" data to the client (browser, insomnia, etc.)
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    //make sure user exists before we try to send it back
    if(user) {
        res.json("name", "bio")
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user",
        })
    }
})

server.post("/api/users", (req, res) => {
    const {name, bio} = req.body;
    db.insert(name, bio)
        .then((user) => {
            if(user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({
                    errorMessage: 'Please provide name and bio for the user.'
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                err: err,
                message: 'There was an error while saving the user to the database'
            })
        })
})


server.post("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.put("/api/users", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.delete("/api/users", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        db.deleteUser(id)
        //204 means a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

// web servers need to be continuously listening
server.listen(8080, () => {
    console.log("server started")
})