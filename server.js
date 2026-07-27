const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Social Media Backend is Running...");
});
app.get("/posts", (req, res) => {
    res.json([
        {
            id: 1,
            user: "Archana",
            content: "Welcome to my Social Media Platform!"
        }
    ]);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Post request ka data padhne ke liye middleware
app.use(express.json());

// Express memory me initial posts
let posts = [
    { id: 1, user: "Archana", content: "Welcome to my Social Media Platform!" }
];

// 1. GET Posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// 2. POST New Post
app.post("/posts", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        user: "Archana",
        content: req.body.content
    };
    posts.unshift(newPost); // List me sabse upar add hoga
    res.json(newPost);
});