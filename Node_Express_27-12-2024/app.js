const express = require("express");
const path = require("path");
const app = express();


const userData = require("./public/usersData.json");

// Middleware to serve static files
const paths = path.join(__dirname, "./public")
app.use(express.static(paths));
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "contact.html"));

})
app.post("/submit",(req,res)=>{
    console.log(req.body)
    res.send("form submitted")
})

app.get("/api/users", (req, res) => {
    res.json(userData);
});


app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10); 
    const user = userData.find(user => user.id === userId);

    if (user) {
        res.json(user); 
    } else {
        res.status(404).json({ "Success": false, "Message": "User not found" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
